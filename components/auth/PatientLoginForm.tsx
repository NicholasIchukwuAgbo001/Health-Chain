import { Smartphone } from "lucide-react";
import { useState } from "react";

export default function PatientLoginForm() {
  const [id, setId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Patient ID:", id);
    console.log("Phone Number:", phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-lightgrey mb-1">
          Patient ID
        </label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground outline-none"
          placeholder="Enter your patient ID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-lightgrey mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lightgrey/70" />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground outline-none"
            placeholder="+234 801 234 5678"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-success/90 text-white py-2 px-4 rounded-lg hover:bg-success transition-colors cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
