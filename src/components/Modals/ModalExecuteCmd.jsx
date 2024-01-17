import React from "react";

import "./modalexecutecmd.css";

const ModalExecuteCmd = ({
  isOpen,
  onClose,
  onExecute,
  options,
  onOptionChange,
  onInputChange,
}) => {
  if (!isOpen) return null;

  const renderOption = (optionId, option) => {
    if (option.type === "normal") {
      return (
        <div className="line-option-cmd" key={optionId}>
          <div className="description-option-cmd">{option.description}</div>
          <div className="field-option-cmd">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={optionId}
                checked={option.checked}
                onChange={(e) => onOptionChange(optionId, e.target.checked)}
              />
              <label className="form-check-label" htmlFor={optionId}>
                {option.name}
              </label>
            </div>
          </div>
        </div>
      );
    } else if (option.type === "with_arguments") {
      return (
        <div className="line-option-cmd" key={optionId}>
          <div className="description-option-cmd">{option.description}</div>
          <div className="field-option-cmd">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={optionId}
                checked={option.checked}
                onChange={(e) => onOptionChange(optionId, e.target.checked)}
              />
              <label className="form-check-label" htmlFor={optionId}>
                {option.name}
              </label>
            </div>
            {option.checked && (
              <input
                className="form-control input-field-option-cmd"
                type="text"
                value={option.inputValue || ""}
                onChange={(e) => onInputChange(optionId, e.target.value)}
                placeholder="Input value"
              />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="overlay">
      <div className="content-check-modal">
        <div className="header-check-modal">
          <div className="title-header-check-modal">Execution options</div>
        </div>
        <div className="button-close-check-modal" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="var(--text-color)"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
        <div className="check-section-modal">
          {options &&
            Object.entries(options).map(([optionName, option]) =>
              renderOption(optionName, option)
            )}
        </div>
        <div className="button-section-modal">
          <button className="btn btn-confirm" onClick={onExecute}>
            Ejecutar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExecuteCmd;
