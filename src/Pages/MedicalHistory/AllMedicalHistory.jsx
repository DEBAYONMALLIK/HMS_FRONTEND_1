import { dispatch } from "d3";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Homelayout from "../../Layouts/HomeLayouts";
import { getAllMediHis } from "../../Redux/Slices/AllMedicalHistory";

function AllMedicalHistoryList(){

    const dispatch=useDispatch();
    const all_medi_records=useSelector((state)=>state.allMedicalHistory.allMedicalHis);
    console.log(all_medi_records)

async function loadMedicalHistory(){
 await dispatch(getAllMediHis());
  
}


    useEffect(()=>{
    loadMedicalHistory();
    },[])

        return(
              <Homelayout>
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">All Medical Records</h2>

    {all_medi_records && all_medi_records.length > 0 ? (
      <div className="space-y-4">
        {all_medi_records.map((record, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-md "
          >
            <h3 className="text-lg font-semibold mb-2">
              Patient: {record.patient}
            </h3>

            <p><strong>Blood Group:</strong> {record.bloodGroup || "N/A"}</p>
            <p><strong>Height:</strong> {record.height ? `${record.height} cm` : "N/A"}</p>
            <p><strong>Health Meter:</strong> {record.healthMeter || "N/A"}</p>
            
            {/* Allergies */}
            {record.allergies?.length > 0 && (
              <p><strong>Allergies:</strong> {record.allergies.join(", ")}</p>
            )}

            {/* Past Surgeries */}
            {record.pastSurgeries?.length > 0 && (
              <p><strong>Past Surgeries:</strong> {record.pastSurgeries.join(", ")}</p>
            )}

            {/* Chronic Diseases */}
            {record.chronicDiseases?.length > 0 && (
              <p><strong>Chronic Diseases:</strong> {record.chronicDiseases.join(", ")}</p>
            )}

            {/* Medications */}
            {record.medications?.length > 0 && (
              <p><strong>Medications:</strong> {record.medications.join(", ")}</p>
            )}

            {/* Weight Records */}
            {record.weight?.length > 0 && (
              <div>
                <strong>Weight Records:</strong>
                <ul className="list-disc list-inside">
                  {record.weight.map((w, idx) => (
                    <li key={idx}>
                      {w.month}: {w.weight} kg
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Health Stats */}
            {record.healthStats?.length > 0 && (
              <div>
                <strong>Health Stats:</strong>
                <ul className="list-disc list-inside">
                  {record.healthStats.map((stat, idx) => (
                    <li key={idx}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-2">
              Created: {new Date(record.createdAt).toLocaleDateString()}  
              {record.updatedAt && (
                <> | Updated: {new Date(record.updatedAt).toLocaleDateString()}</>
              )}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p>No medical records found.</p>
    )}
  </div>
</Homelayout>

);

}
export default AllMedicalHistoryList;
