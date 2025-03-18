import { useLanguage } from "@/store/language.context";
import { Link } from "@tanstack/react-router";
import ContentCard from "./ContentCard";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const sampleMovies = [
  {
    title: "Inception",
    image_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    additionalInfo: ["2010", "Sci-Fi"],
    tags: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    title: "Breaking Bad",
    image_path: "/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    additionalInfo: ["2008", "Drama"],
    tags: ["Drama", "Crime", "Thriller"],
  },
  {
    title: "The Dark Knight",
    image_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    additionalInfo: ["2008", "Action"],
    tags: ["Action", "Crime", "Drama"],
  },
  {
    title: "Stranger Things",
    image_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    additionalInfo: ["2016", "Sci-Fi"],
    tags: ["Drama", "Fantasy", "Horror"],
  },
  {
    title: "Interstellar",
    image_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    additionalInfo: ["2014", "Sci-Fi"],
    tags: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    title: "Game of Thrones",
    image_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    additionalInfo: ["2011", "Fantasy"],
    tags: ["Action", "Adventure", "Drama"],
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-[1200px] min-h-screen flex flex-col justify-between">
      <Card className="bg-card/60 backdrop-blur-sm border-none">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-4xl font-bold font-Anton">
            {t("homePage.welcome.title")}
          </CardTitle>
          <CardDescription className="text-xl">
            {t("homePage.welcome.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg">{t("homePage.welcome.description")}</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="default">
              {t("homePage.welcome.signIn")}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">{t("homePage.welcome.learnMore")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-Anton text-center">
            {t("homePage.featured.title")}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            {t("homePage.featured.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sampleMovies.map((content, index) => (
              <ContentCard
                key={index}
                title={content.title}
                image_path={content.image_path}
                additionalInfo={content.additionalInfo}
                tags={content.tags}
                className="w-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm border-none mt-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-Anton text-center">
            {t("homePage.features.title")}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            {t("homePage.features.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
          {[
            {
              title: t("homePage.features.personalLibrary.title"),
              description: t("homePage.features.personalLibrary.description"),
            },
            {
              title: t("homePage.features.detailedInfo.title"),
              description: t("homePage.features.detailedInfo.description"),
            },
            {
              title: t("homePage.features.minimalisticInterface.title"),
              description: t(
                "homePage.features.minimalisticInterface.description"
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center space-y-3 p-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <h3 className="text-xl font-semibold font-Anton">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
