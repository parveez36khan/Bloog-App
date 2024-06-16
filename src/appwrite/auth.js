// Import Appwrite configuration and libraries
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// Define the AuthService class
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount() :: ", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password); // Corrected method name
        } catch (error) {
            console.error("AuthService :: login() :: ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser() :: ", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();  // Appwrite session deletion
            localStorage.removeItem('appwrite-session');  // Remove from local storage if stored
            console.log("Successfully logged out");
        } catch (error) {
            console.error("AuthService :: logout() :: ", error);
        }
    }
}

// Export an instance of AuthService
const authService = new AuthService();
export default authService;
