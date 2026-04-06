import requests
import sys

# Configuration
API_URL = "http://localhost:3000/api/verify-license"

def verify_license(key):
    try:
        response = requests.post(API_URL, json={"key": key})
        if response.status_code == 200:
            data = response.json()
            if data.get("valid"):
                print(f"✅ License Verified!")
                print(f"Product: {data.get('product')}")
                print(f"Owner: {data.get('owner')}")
                return True
        else:
            error = response.json().get("error", "Unknown error")
            print(f"❌ License Error: {error}")
    except Exception as e:
        print(f"⚠️ Connection Error: {e}")
    return False

def main():
    print("--- SolutionX Script Runner ---")
    license_key = input("Enter your license key (SX-XXXX-XXXX): ").strip()
    
    if verify_license(license_key):
        print("\n🚀 Running script logic...")
        # Your actual script logic here
        print("Hello from SolutionX! Your automation is now active.")
    else:
        print("\n🚫 Access Denied. Please purchase a valid license.")
        sys.exit(1)

if __name__ == "__main__":
    main()
