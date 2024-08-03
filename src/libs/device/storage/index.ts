/**
 * @description Device storage with encryption
 */
import EncryptedStorage from "react-native-encrypted-storage";

// Define type for storage functions
type StorageObject = Record<string, any>;

// Define functions with TypeScript types

async function set(key: string, object: StorageObject): Promise<void> {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(object));
  } catch (error) {
    console.error("secure.set", error);
  }
}

async function get<T>(key: string): Promise<T | undefined> {
  try {
    const data = await EncryptedStorage.getItem(key);
    if (data) {
      // Safely parse JSON and assert the type
      return JSON.parse(data) as T;
    }
  } catch (error) {
    console.error("secure.get", error);
  }
  return undefined;
}

async function remove(key: string): Promise<void> {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error("secure.remove", error);
  }
}

async function wipe(): Promise<void> {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error("secure.wipe", error);
  }
}

// Export the functions as an object
const secureStorage = {
  set,
  get,
  remove,
  wipe,
};

export default secureStorage;
