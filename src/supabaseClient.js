// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase credentials are missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if database is properly set up - will show error if table doesn't exist
const checkDatabaseSetup = async () => {
  try {
    // Check if the messages table exists and has the expected structure
    const { data, error } = await supabase
      .from("messages")
      .select("id, flowers")
      .limit(1);

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.error(
          '❌ Database table "messages" not found. Please run the setup SQL script from the README.'
        );
        showSetupErrorMessage();
      } else {
        console.error("Error checking database:", error.message);
      }
    } else {
      console.log("✅ Database schema exists and is accessible.");
    }
  } catch (error) {
    console.error("Failed to check database schema:", error.message);
  }
};

// Show user-friendly error message in UI
const showSetupErrorMessage = () => {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addErrorBanner);
  } else {
    addErrorBanner();
  }
};

const addErrorBanner = () => {
  const setupMessage = document.createElement("div");
  setupMessage.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; background: #f8d7da; color: #721c24; padding: 1rem; text-align: center; z-index: 9999;">
      <p><strong>Database not set up!</strong> Please follow the instructions in the README to set up the database manually.</p>
    </div>
  `;
  document.body.prepend(setupMessage);
};

// Run check on startup
checkDatabaseSetup();

export default supabase;
