import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";

export default function SelectLabels({ advert, setAdvert }) {
  /* TODO no carga las labels existentes */
  const [labelsSelected, setLabelsSelected] = useState(advert?.labels || []);
  const handleDeleteChip = (chip) => () => {
    let res = labelsSelected.filter((element) => element !== chip);
    setLabelsSelected(res);
  };

  const hanldeAddChip = (chip) => {
    setLabelsSelected([...labelsSelected, chip]);
  };

  //console.log(labelsSelected);
  useEffect(() => {
    setAdvert({ ...advert, labels: labelsSelected });
  }, [labelsSelected]);

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
            icon={chip?.icon}
            color={chip?.color || "primary"}
            label={chip?.label}
            size="small"
            onDelete={handleDeleteChip(chip)}
          />
        ))}
      </div>
      {CHIP_LABELS.map((chip) => {
        return (
          <Chip
            disabled={labelsSelected?.length > 2}
            style={{ margin: "4px" }}
            icon={chip?.icon}
            color={chip?.color || "primary"}
            label={chip?.label}
            size="small"
            onClick={() => hanldeAddChip(chip)}
          />
        );
      })}
    </div>
  );
}
