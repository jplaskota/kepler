import logo_dark from "@/assets/logo_dark.png";
import logo_light from "@/assets/logo_light.png";
import { useLanguage } from "@/store/language.context";
import { Github, Mail, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={logo_dark}
            alt="Kepler Logo"
            className="h-16 hidden dark:block"
          />
          <img
            src={logo_light}
            alt="Kepler Logo"
            className="h-16 block dark:hidden"
          />
          <h1 className="text-4xl">Kepler</h1>
        </div>
        <p className="text-xl text-center max-w-2xl text-muted-foreground font-Montserrat">
          {t("about.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-Anton">
              {t("about.whatIsKepler.title")}
            </CardTitle>
            <CardDescription className="font-Montserrat">
              {t("about.whatIsKepler.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-Montserrat">{t("about.whatIsKepler.description1")}</p>
            <p className="font-Montserrat">{t("about.whatIsKepler.description2")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-Anton">
              {t("about.keyFeatures.title")}
            </CardTitle>
            <CardDescription>{t("about.keyFeatures.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 font-Montserrat">
              <li className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  <strong>Personal Library:</strong>{" "}
                  {t("about.keyFeatures.personalLibrary")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  <strong>Detailed Information:</strong>{" "}
                  {t("about.keyFeatures.detailedInfo")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  <strong>Recommendations:</strong>{" "}
                  {t("about.keyFeatures.recommendations")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  <strong>Customization:</strong>{" "}
                  {t("about.keyFeatures.customization")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  <strong>Multi-language Support:</strong>{" "}
                  {t("about.keyFeatures.multiLanguage")}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl font-Anton">
            {t("about.howToUse.title")}
          </CardTitle>
          <CardDescription className="font-Montserrat">{t("about.howToUse.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {t("about.howToUse.createAccount.title")}
            </h3>
            <p className="font-Montserrat">{t("about.howToUse.createAccount.description")}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {t("about.howToUse.browseContent.title")}
            </h3>
            <p className="font-Montserrat">{t("about.howToUse.browseContent.description")}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {t("about.howToUse.buildLibrary.title")}
            </h3>
            <p className="font-Montserrat">{t("about.howToUse.buildLibrary.description")}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {t("about.howToUse.customizeExperience.title")}
            </h3>
            <p className="font-Montserrat">{t("about.howToUse.customizeExperience.description")}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-Anton">
            {t("about.connect.title")}
          </CardTitle>
          <CardDescription className="font-Montserrat">{t("about.connect.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/jplaskota"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="w-full sm:w-auto">
                <Github className="mr-2 h-4 w-4" />
                {t("about.connect.github")}
              </Button>
            </a>
            <a href="mailto:contact@example.com">
              <Button variant="default" className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                {t("about.connect.contact")}
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
