import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors: formErrors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={formErrors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={formErrors?.maxCapacity?.message}
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
        />
      </FormRow>

      <FormRow label="Regular price" error={formErrors?.regularPrice?.message}>
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
        />
      </FormRow>

      <FormRow label="Discount" error={formErrors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount price is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              `Discount should be less than regular price`,
          })}
        />
      </FormRow>

      <FormRow label="description" error={formErrors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "Description is required" })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo" error={formErrors?.image?.message}>
        <FileInput
          type="file"
          id="image"
          {...register("image", { required: "Cabin photo is required" })}
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
