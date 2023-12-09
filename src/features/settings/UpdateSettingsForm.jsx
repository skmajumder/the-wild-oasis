import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

const UpdateSettingsForm = () => {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  if (isLoading) return <Spinner />;

  const handleUpdateSetting = (e, field) => {
    const value = e.target.value;

    if (!value || !field) return;

    updateSetting({ [field]: value });
  };

  return (
    <>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            disabled={isUpdating}
            defaultValue={minBookingLength}
            onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            disabled={isUpdating}
            defaultValue={maxBookingLength}
            onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            disabled={isUpdating}
            defaultValue={maxGuestsPerBooking}
            onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            disabled={isUpdating}
            defaultValue={breakfastPrice}
            onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>
    </>
  );
};

export default UpdateSettingsForm;
