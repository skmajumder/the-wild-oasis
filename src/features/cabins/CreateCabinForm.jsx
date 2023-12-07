import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabin = {} }) {
  // * Cabin information that needs to be edited
  const { id: editId, ...restEditValue } = cabin;
  const isEditSession = Boolean(editId);

  // * react hook form. If cabin info is available, then set them to the default value in form by "defaultValues". Also get the form input error message
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? restEditValue : {},
  });
  const { errors: formInputErrors } = formState;

  // * supabase DB
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ editCabinData, editId }) =>
      createEditCabin(editCabinData, editId),
    onSuccess: () => {
      toast.success("cabin edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  // * submut form info to the DB
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin({ editCabinData: { ...data, image }, editId: editId });
    else createCabin({ ...data, image: image });
  }

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={formInputErrors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Cabin name is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={formInputErrors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Max capacity of a cabin is required",
            min: {
              value: 2,
              message: "Max capacity of a cabin is 2 to 16",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={formInputErrors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Cabin regular price is required",
            min: {
              value: 100,
              message: "The minimum price for a cabin is 100",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={formInputErrors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount price is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              `Discount should be less than regular price`,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={formInputErrors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "Description is required" })}
          defaultValue=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={formInputErrors?.image?.message}>
        <FileInput
          id="image"
          {...register("image", {
            required: isEditSession ? false : "Cabin photo is required",
          })}
          accept="image/*"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession
            ? `${isEditing ? "Editing cabin..." : "Edit cabin"}`
            : `${isCreating ? "Creating cabin..." : "Add new cabin"}`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
