"use client";

import { useCallback } from "react";
import { FilterParams } from "@/types/account";
import { Slider, Box, Typography } from "@mui/material";
import Button from "@/components/Button/Button";
import { CalendarMonth, PaidOutlined, RestartAltOutlined } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

import classNames from "classnames/bind";
import style from "./FilterPanel.module.scss";
const cx = classNames.bind(style);

export interface FilterFormInputs {
  dateRangeStart: string;
  dateRangeEnd: string;
  amountRange: [number, number];
}

interface FilterPanelProps {
  showFilters: boolean;
  onApplyFilters: (filters: FilterParams) => void;
  onResetFilters: () => void;
  currentFilters: FilterParams;
}

const MAX_AMOUNT = 10000;

const FilterPanel = ({ showFilters, onApplyFilters, onResetFilters, currentFilters }: FilterPanelProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setError,
    watch,
    clearErrors,
  } = useForm<FilterFormInputs>({
    defaultValues: {
      dateRangeStart: currentFilters.dateRange?.start || "",
      dateRangeEnd: currentFilters.dateRange?.end || "",
      amountRange: [currentFilters.amountRange?.min || 0, currentFilters.amountRange?.max || MAX_AMOUNT],
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (data: FilterFormInputs) => {
      // RHF's handleSubmit ensures that this function only runs if there are no errors
      const filters: FilterParams = {};
      if (new Date(data.dateRangeStart) > new Date(data.dateRangeEnd)) {
        setError("dateRangeStart", { message: "Start date must be before end date" });
        setError("dateRangeEnd", { message: "End date must be after start date" });
        return;
      }

      if (data.dateRangeStart || data.dateRangeEnd) {
        filters.dateRange = {
          start: data.dateRangeStart,
          end: data.dateRangeEnd,
        };
      }

      if (data.amountRange[0] > 0 || data.amountRange[1] < MAX_AMOUNT) {
        filters.amountRange = {
          min: data.amountRange[0],
          max: data.amountRange[1],
        };
      }

      onApplyFilters(filters);
    },
    [onApplyFilters, setError]
  );

  const handleReset = useCallback(() => {
    reset({
      dateRangeStart: "",
      dateRangeEnd: "",
      amountRange: [0, MAX_AMOUNT],
    });
    clearErrors(["dateRangeStart", "dateRangeEnd", "amountRange"]);
    onResetFilters();
  }, [reset, onResetFilters, clearErrors]);

  const formatAmountLabel = (value: number) => {
    return value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : `$${value}`;
  };

  const [dateRangeStart, dateRangeEnd, amountRange] = watch(["dateRangeStart", "dateRangeEnd", "amountRange"]);

  const hasActiveFiltersOrDirty =
    dateRangeStart !== "" || dateRangeEnd !== "" || amountRange[0] !== 0 || amountRange[1] !== MAX_AMOUNT || isDirty;

  if (!showFilters) return null;

  return (
    <div className={cx("root")}>
      <h3 className={cx("title")}>Filters</h3>
      <div className={cx("content")}>
        {/* Date Range Filter */}
        <div className={cx("group")}>
          <div className={cx("label")}>
            <CalendarMonth />
            <span>Date Range</span>
          </div>
          <div className={cx("date-inputs")}>
            <div className={cx("input-group")}>
              <label htmlFor="date-start">From</label>
              <Controller
                name="dateRangeStart"
                control={control}
                render={({ field }) => (
                  <input
                    id="date-start"
                    type="date"
                    {...field}
                    onChange={(e) => {
                      clearErrors(["dateRangeStart", "dateRangeEnd"]);
                      field.onChange(e);
                    }}
                    className={cx("date-input", { "input-error": errors.dateRangeStart })}
                  />
                )}
              />
            </div>
            <div className={cx("input-group")}>
              <label htmlFor="date-end">To</label>
              <Controller
                name="dateRangeEnd"
                control={control}
                render={({ field }) => (
                  <input
                    id="date-end"
                    type="date"
                    {...field}
                    onChange={(e) => {
                      clearErrors(["dateRangeStart", "dateRangeEnd"]);
                      field.onChange(e);
                    }}
                    className={cx("date-input", { "input-error": errors.dateRangeEnd })}
                  />
                )}
              />
            </div>
          </div>
          {(errors.dateRangeStart || errors.dateRangeEnd) && (
            <Typography color="error" variant="caption" className={cx("error-message")}>
              {errors.dateRangeStart?.message || errors.dateRangeEnd?.message}
            </Typography>
          )}
        </div>

        {/* Amount Range Filter */}
        <div className={cx("group")}>
          <div className={cx("label")}>
            <PaidOutlined />
            <span>Amount Range</span>
          </div>
          <div className={cx("amount-slider-container")}>
            <Box sx={{ px: 1 }}>
              <Controller
                name="amountRange"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Slider
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatAmountLabel}
                    min={0}
                    max={MAX_AMOUNT}
                    step={50}
                    color={errors.amountRange ? "error" : "primary"}
                  />
                )}
              />
            </Box>
            <div className={cx("amount-labels")}>
              <Typography variant="body2" className={cx("amount-label", { "error-text": errors.amountRange })}>
                {formatAmountLabel(amountRange[0])}
              </Typography>
              <Typography variant="body2" className={cx("amount-label", { "error-text": errors.amountRange })}>
                {formatAmountLabel(amountRange[1])}
              </Typography>
            </div>
          </div>
          {errors.amountRange && (
            <Typography color="error" variant="caption" className={cx("error-message")}>
              {errors.amountRange.message}
            </Typography>
          )}
        </div>
      </div>

      <div className={cx("actions")}>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleReset}
          fullWidth
          disabled={!hasActiveFiltersOrDirty}
          startIcon={<RestartAltOutlined />}
        >
          Reset
        </Button>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          disabled={Object.keys(errors).length > 0}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
