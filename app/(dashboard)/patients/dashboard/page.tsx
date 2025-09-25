import Dashboard from "@/components/dashboard/patient/Dashboard";
import Header from "@/components/dashboard/patient/Header";
import Footer from "@/components/landingPage/footer/Footer";

export default function PatientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Dashboard />
      </main>

      <Footer />
    </div>
  );
}
