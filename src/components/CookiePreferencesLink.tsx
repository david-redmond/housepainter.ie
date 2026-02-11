"use client";

export default function CookiePreferencesLink() {
  return (
    <button
      type="button"
      className="hover:text-black"
      onClick={() => {
        window.dispatchEvent(new Event("sp:cookie-preferences"));
      }}
    >
      Change cookie preferences
    </button>
  );
}
