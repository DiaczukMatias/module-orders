import axios from "axios";
import * as turf from "@turf/turf";
import { useState } from "react";

const argentinaBounds = {
  type: "Polygon" as const,
  coordinates: [
    [
      [-73.56, -55.05],
      [-53.63, -55.05],
      [-53.63, -21.78],
      [-73.56, -21.78],
      [-73.56, -55.05],
    ],
  ],
};

const isInArgentina = (lat: number, lng: number): boolean => {
  const point = turf.point([lng, lat]);
  return turf.booleanPointInPolygon(point, argentinaBounds);
};

const isValidCoordinate = (value: string): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= -180 && num <= 180;
};

interface AddressForm {
  address: string;
  ext_num: string;
  int_num: string;
  zipcode: string;
  state: string;
  country: string;
  lat: string;
  lng: string;
}

interface OrderDetails {
  productCount: number;
  totalWeightKg: string;
  status: string;
}

export interface CreateOrderData {
  origin: {
    coordinates: { lat: number; lng: number };
    address: Omit<AddressForm, "lat" | "lng" | "country"> & { country: string };
  };
  destination: {
    coordinates: { lat: number; lng: number };
    address: Omit<AddressForm, "lat" | "lng" | "country"> & { country: string };
  };
  productCount: number;
  totalWeightKg: number;
  status: string;
}

export default function useCreateOrder() {
  const [origin, setOrigin] = useState<AddressForm>({
    address: "",
    ext_num: "",
    int_num: "",
    zipcode: "",
    state: "",
    country: "Argentina",
    lat: "",
    lng: "",
  });

  const [destination, setDestination] = useState<AddressForm>({
    address: "",
    ext_num: "",
    int_num: "",
    zipcode: "",
    state: "",
    country: "Argentina",
    lat: "",
    lng: "",
  });

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    productCount: 1,
    totalWeightKg: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOriginChange = (field: keyof AddressForm, value: string) => {
    setOrigin((prev) => ({ ...prev, [field]: value }));
  };

  const handleDestinationChange = (field: keyof AddressForm, value: string) => {
    setDestination((prev) => ({ ...prev, [field]: value }));
  };

  const handleOrderDetailsChange = (
    field: keyof OrderDetails,
    value: string | number
  ) => {
    setOrderDetails((prev) => ({ ...prev, [field]: value }));
  };

  const prepareOrderData = (): CreateOrderData => {
    return {
      origin: {
        coordinates: {
          lat: parseFloat(origin.lat) || 0,
          lng: parseFloat(origin.lng) || 0,
        },
        address: {
          address: origin.address,
          zipcode: origin.zipcode,
          ext_num: origin.ext_num,
          int_num: origin.int_num,
          state: origin.state,
          country: origin.country,
        },
      },
      destination: {
        coordinates: {
          lat: parseFloat(destination.lat) || 0,
          lng: parseFloat(destination.lng) || 0,
        },
        address: {
          address: destination.address,
          zipcode: destination.zipcode,
          ext_num: destination.ext_num,
          int_num: destination.int_num,
          state: destination.state,
          country: destination.country,
        },
      },
      productCount: orderDetails.productCount,
      totalWeightKg: parseFloat(orderDetails.totalWeightKg) || 0,
      status: orderDetails.status || "created",
    };
  };

  const validateForm = (): boolean => {
    const weight = parseFloat(orderDetails.totalWeightKg) || 0;

    if (weight > 25) {
      setError(
        "Los paquetes mayores a 25kg requieren arreglos especiales de envío. Por favor contacte a nuestro equipo de soporte."
      );
      return false;
    }

    if (
      !origin.address ||
      !origin.ext_num ||
      !origin.zipcode ||
      !origin.state
    ) {
      setError(
        "Por favor complete todos los campos obligatorios en la dirección de origen"
      );
      return false;
    }

    if (!origin.lat || !origin.lng) {
      setError("Por favor ingrese las coordenadas de origen");
      return false;
    }

    if (!isValidCoordinate(origin.lat) || !isValidCoordinate(origin.lng)) {
      setError("Las coordenadas de origen no son válidas");
      return false;
    }

    const originLat = parseFloat(origin.lat);
    const originLng = parseFloat(origin.lng);
    if (!isInArgentina(originLat, originLng)) {
      setError("Las coordenadas de origen deben estar dentro de Argentina");
      return false;
    }

    if (
      !destination.address ||
      !destination.ext_num ||
      !destination.zipcode ||
      !destination.state
    ) {
      setError(
        "Por favor complete todos los campos obligatorios en la dirección de destino"
      );
      return false;
    }

    // Validar coordenadas de destino
    if (!destination.lat || !destination.lng) {
      setError("Por favor ingrese las coordenadas de destino");
      return false;
    }

    if (
      !isValidCoordinate(destination.lat) ||
      !isValidCoordinate(destination.lng)
    ) {
      setError("Las coordenadas de destino no son válidas");
      return false;
    }

    const destLat = parseFloat(destination.lat);
    const destLng = parseFloat(destination.lng);
    if (!isInArgentina(destLat, destLng)) {
      setError("Las coordenadas de destino deben estar dentro de Argentina");
      return false;
    }

    if (!orderDetails.productCount || !orderDetails.totalWeightKg) {
      setError("Por favor complete los detalles del envío");
      return false;
    }

    setError(null);
    return true;
  };

  const submitOrder = async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setLoading(true);
    try {
      const orderData = prepareOrderData();
      console.log("Datos a enviar:", orderData);

      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orden creada:", response.data);
      return true;
    } catch (err: any) {
      setError("Error al crear la orden. Por favor intente nuevamente.");
      console.error("Error creating order:", err.response?.data || err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isOversizedPackage = (): boolean => {
    const weight = parseFloat(orderDetails.totalWeightKg) || 0;
    return weight > 25;
  };

  return {
    origin,
    destination,
    orderDetails,
    loading,
    setError,
    isOversizedPackage,
    error,
    handleOriginChange,
    handleDestinationChange,
    handleOrderDetailsChange,
    submitOrder,
  };
}
