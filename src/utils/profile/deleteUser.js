export const deleteUser = async () => {
    const user_id = await getId();
    const { data, error } = await supabase.rpc("delete_user", { user_id });
    if (error) {
      console.error("Error:", error.message);
    }
    console.log("Result from RPC:", data);
    await signOut();
  };