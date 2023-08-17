import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://oxsfsgftgweqbhsyfcam.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data: cabin, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return cabin;

  // 2. Upload image
  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabin.id);

    if (storageError) {
      console.storageError(error);
      throw new Error(
        "Cabin image could not be uploaded and cabin was not created"
      );
    }
  }

  return cabin;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return true;
}
