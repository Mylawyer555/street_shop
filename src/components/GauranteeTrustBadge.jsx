import { CiDeliveryTruck } from "react-icons/ci";
import { RiCustomerService2Fill } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const GauranteeTrustBadge = () => {
  return (
    <div className="w-full mt-10 bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Shipping */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4">
          <CiDeliveryTruck className="text-[48px] md:text-[64px] text-primary" />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Worldwide Shipping</h2>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Delivering to over 200 countries including USA, Canada, Australia, and more.
            </p>
          </div>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4">
          <RiCustomerService2Fill className="text-[48px] md:text-[64px] text-primary" />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">24/7 Customer Support</h2>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Our support team is available anytime you need assistance.
            </p>
          </div>
        </div>

        {/* Secure Payments */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4">
          <VscWorkspaceTrusted className="text-[48px] md:text-[64px] text-primary" />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Secure Payments</h2>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Your transactions are encrypted and 100% protected.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GauranteeTrustBadge;
