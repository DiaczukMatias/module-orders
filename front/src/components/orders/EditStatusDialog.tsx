import { OrderStatus } from "@/lib/hooks/useOrders";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  currentStatus: OrderStatus;
  onSave: (newStatus: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = [
  "created",
  "collected",
  "at_station",
  "in_transit",
  "delivered",
  "cancelled",
];

const statusLabels: Record<OrderStatus, string> = {
  created: "Creado",
  collected: "Recolectado",
  at_station: "En Estación",
  in_transit: "En Ruta",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const EditStatusDialog: React.FC<Props> = ({
  open,
  onClose,
  currentStatus,
  onSave,
}) => {
  const [newStatus, setNewStatus] = useState<OrderStatus>(currentStatus);

  useEffect(() => {
    setNewStatus(currentStatus);
  }, [currentStatus]);

  const handleSave = () => {
    if (newStatus !== currentStatus) {
      onSave(newStatus);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Modificar estado de la orden</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: "20rem", mt: 2 }}>
          <InputLabel id="status-select-label">Estado</InputLabel>
          <Select
            labelId="status-select-label"
            value={newStatus}
            label="Estado"
            onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {statusLabels[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            textTransform: "none",
            letterSpacing: "0.5px",
            backgroundColor: "#ff1313ff",
          }}
          variant="contained"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          sx={{
            textTransform: "none",
            letterSpacing: "0.5px",
            backgroundColor: "#20B2AA",
          }}
          onClick={handleSave}
          variant="contained"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStatusDialog;
