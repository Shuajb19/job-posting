import {supabase} from "../../../supabaseClient.js";

function Jobs() {
    const testF = async () => {
        // const userId = JSON.parse( localStorage.getItem('user')).user.id
        // console.log(userId)
        // await supabase.from("user_roles").upsert([{ user_id: userId, role: "admin" }]);

        const { data: { user } } = await supabase.auth.getUser();

        const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id)
            .single();

        console.log("User role:", roleData.role);
    }

    return (
        <div onClick={testF}>
            Jobs
        </div>
    )
}

export default Jobs;