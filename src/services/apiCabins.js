import { generateId } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, editCabinId) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // * given image name with a random digit
  const imageName = `${generateId()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // * creating the image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // * supabase query
  let query = supabase.from("cabins");

  // * Create cabin
  if (!editCabinId) query = query.insert([{ ...newCabin, image: imagePath }]);

  // * Edit cabin
  if (editCabinId)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", editCabinId);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
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
