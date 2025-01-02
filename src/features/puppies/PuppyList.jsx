import { useGetPuppiesQuery } from "./puppySlice";
import { useState } from "react";
import { Link } from "react-router-dom";
/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList() {
  const [puppySearch, setPuppySearch] = useState("");

  const { data: puppies, isLoading } = useGetPuppiesQuery();
  console.log(puppies);
  const filteredPuppies =
    puppies?.players?.filter(
      (puppy) =>
        puppy.name &&
        puppy.name.toLowerCase().includes(puppySearch.toLowerCase()) //makes it so the puppies names do not have to be uppercase
    ) || [];
  return (
    <article>
      <h2>Roster</h2>
      {/* adding the following for the search */}
      <input
        type="text"
        placeholder="puppySearch"
        value={puppySearch}
        onChange={(e) => setPuppySearch(e.target.value)}
      />
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {filteredPuppies?.length === 0 && (
          <li>No puppies with that name, please try again.</li>
        )}
        {filteredPuppies?.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <Link to={`/puppy/${p.id}`}>See details</Link>
          
          </li>
        ))}
      </ul>
    </article>
  );
}
