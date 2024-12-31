import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppySlice";

/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  const { data: puppy, isLoading } = useGetPuppyQuery(selectedPuppyId);

  const [deletePuppy] = useDeletePuppyMutation();

  function removePuppy(id) {
    deletePuppy(id);
    setSelectedPuppyId(null);
  }


  if (!selectedPuppyId) {
   <p>Please select a puppy to see more details.</p>;
  }
  if (isLoading) {
    return <p>Loading puppy information...</p>;
  }
 return (
  <aside>
    <h2>{puppy.name} #{puppy.id}</h2>
<p>Team: {puppy.team?.name || "Team unassigned"}</p>  
<p>Breed: {puppy.breed}</p>
<p>Owner: {puppy.owner || "Owner unassigned"}</p>
<button onClick={() => removePuppy(puppy.id)}>Remove puppy (please remove only the ones you create)</button>
<figure>
  <img src={puppy.imageUrl} alt={puppy.name} />
</figure>
</aside>
 )
}