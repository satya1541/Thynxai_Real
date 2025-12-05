import Navigation from "../Navigation";

export default function NavigationExample() {
  return <Navigation onContactClick={() => console.log("Contact clicked")} />;
}
