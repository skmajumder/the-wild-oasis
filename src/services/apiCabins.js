import { generateId } from "../utils/helpers";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // https://qmdmmvntxehojocvvxcy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${generateId()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error: insertError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (insertError) {
    console.error(insertError);
    throw new Error("Cabins could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      `${imageName} could not be stored on DB & Cabin ${data.name} could not be created`
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
