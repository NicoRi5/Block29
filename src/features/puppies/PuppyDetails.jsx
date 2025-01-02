import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppySlice";
import { useParams } from "react-router-dom";
/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails() {
  const { puppyId } = useParams();
  const { data: puppy, isLoading, error } = useGetPuppyQuery(puppyId);

  const [deletePuppy] = useDeletePuppyMutation();

  function removePuppy(id) {
    deletePuppy(id);
  }

  if (isLoading) {
    return <p>Loading puppy information...</p>;
  }
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  if (!puppy) {
    return <p>Information could not be retrieved, please try again!</p>;
  }
  return (
    <aside>
      <h2>
        {puppy.name} #{puppy.id}
      </h2>
      <p>Team: {puppy.team?.name || "Team unassigned"}</p>
      <p>Breed: {puppy.breed}</p>
      <p>Owner: {puppy.owner || "Owner unassigned"}</p>
      <button onClick={() => removePuppy(puppy.id)}>
        Remove puppy (please remove only the ones you create)
      </button>
      <figure>
        <img src={puppy.imageUrl} alt={puppy.name} />
      </figure>
    </aside>
  );
}
