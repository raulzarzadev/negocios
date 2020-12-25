import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";

export default function SelectLabels({ advert, setAdvert }) {
  const [labelsSelected, setLabelsSelected] = useState([]);
  const [disable, setDisable] = useState(false);

  const handleDeleteChip = (chipToDelete) => () => {
    if (labelsSelected.length <= 3) setDisable(false);
    setLabelsSelected((chips) =>
      chips?.filter((chip) => chip?.key !== chipToDelete?.key)
    );
    setAdvert({ ...advert, labels: labelsSelected });
  };

  const hanldeAddToLabelList = (newLabel) => {
    if (labelsSelected.length >= 2) {
      setDisable(true);
    }
    setLabelsSelected([...labelsSelected, newLabel]);
    setAdvert({ ...advert, labels: labelsSelected });
  };

  useEffect(() => {
    setLabelsSelected(advert.labels);
  }, [advert.labels]);

  return (
    <div>
      <em>Max 3 etiquetas</em>
      <div
        style={{
          maxWidth: "300px",
          border: "1px solid black",
          borderRadius: "16px",
          padding: "16px",
          minHeight: "48px",
          margin: "16px auto",
        }}
      >
        {labelsSelected?.map((chip) => (
          <Chip
            style={{ margin: "4px" }}
            icon={chip.icon}
            color={chip.color || "primary"}
            label={chip.label}
            size="small"
            onDelete={handleDeleteChip(chip)}
          />
        ))}
      </div>
      {CHIP_LABELS.map((chip) => {
        return (
          <Chip
            disabled={disable}
            style={{ margin: "4px" }}
            icon={chip.icon}
            color={chip.color || "primary"}
            label={chip.label}
            size="small"
            onClick={() => hanldeAddToLabelList(chip)}
          />
        );
      })}
    </div>
  );
}
