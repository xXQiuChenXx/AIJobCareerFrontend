import { NavLink } from "react-router";

const OrganizationTraining = () => {
  return (
    <section className="mb-16 bg-gray-50 p-8 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Organization Training
          </h2>
          <p className="text-gray-600">
            Access quality education with no or minimal cost
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-blue-600"
              >
                <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                <path d="M12 13v8" />
                <path d="M5 13v6a2 2 0 0 0 2 2h8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">SME Corporation Malaysia</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Free access to selected Coursera courses through a partnership with
            SDEC.
          </p>
          <NavLink
            to="#"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 ml-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default OrganizationTraining;
