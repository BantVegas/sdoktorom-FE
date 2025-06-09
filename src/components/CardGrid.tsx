import CardButton from "./CardButton";
import { useRouter } from "next/navigation";

const CARDS = [
  {
    title: "VAŠE PRÍZNAKY",
    desc: "Sem napíšte alebo vložte obrázok vášho zdravotného problému.",
    link: "/symptomy",
  },
  {
    title: "OBJEDNAŤ SA",
    desc: "Rezervujte si termín online konzultácie s lekárom.",
    link: "/objednat-sa",
  },
  {
    title: "HISTÓRIA",
    desc: "Pozrite si prehľad všetkých vašich predchádzajúcich konzultácií.",
    link: "/historia",
  },
  {
    title: "SPRÁVA OD DOKTORA",
    desc: "Zobrazte si odpoveď alebo odporúčanie od lekára k vášmu prípadu.",
    link: "/sprava",
  },
];

export default function CardGrid() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl px-2">
      {CARDS.map(({ title, desc, link }) => (
        <CardButton
          key={title}
          title={title}
          description={desc}
          onClick={() => router.push(link)}
        />
      ))}
    </div>
  );
}
