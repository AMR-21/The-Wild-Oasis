import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function signup({ fullName, password, email }) {
  // options to add extra data for the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        role: "admin",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateDate;

  // 1 update data
  if (fullName) updateDate = { data: { fullName } };
  if (password) updateDate = { password };

  const { data, error } = await supabase.auth.updateUser(updateDate);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2 upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3 update user avatar path
  const { data: user, error: pathError } = await supabase.auth.updateUser({
    data: {
      avatar: `https://oxsfsgftgweqbhsyfcam.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (pathError) {
    throw new Error(pathError.message);
  }

  return user;
}
