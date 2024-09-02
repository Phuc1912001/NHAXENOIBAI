import HomePage from "./components/HomePage/HomePage";
import MethodPage from "./components/MethodPage/MethodPage";
import Partner from "./components/Partner/Partner";
import PeopleReview from "./components/PeopleReview/PeopleReview";

export default function Home() {
  return (
    <div>
      <HomePage />
      <PeopleReview />
      <Partner />
      <MethodPage />
    </div>
  );
}
