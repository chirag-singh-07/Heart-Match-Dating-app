import Header from "@/components/common/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  MessageCircle,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const HomePage = () => {
  const [homeRef, homeInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="flex-1" id="home">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-rose-50">
          <div className="container px-4 md:px-6">
            <motion.div
              ref={homeRef}
              variants={fadeIn}
              initial="hidden"
              animate={homeInView ? "visible" : "hidden"}
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]"
            >
              {/* Left Content */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <Badge className="inline-flex bg-rose-100 text-rose-700 hover:bg-rose-100 hover:text-rose-700">
                    Find Your Perfect Match
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Meaningful Connections
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of singles who have found love through our
                    intelligent matching system. Start your journey to
                    meaningful connections today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                    Get Started Free
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Over 2 million successful matches and counting</span>
                </div>
              </motion.div>

              {/* Right Image Section */}
              <motion.div
                variants={fadeIn}
                className="mx-auto lg:mx-0 relative"
              >
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
                <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="col-span-2">
                      <motion.img
                        src="/3.jpg"
                        width={400}
                        height={200}
                        alt="Dating app interface"
                        className="rounded-lg object-cover w-full"
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <img
                        src="/1.jpg"
                        width={150}
                        height={150}
                        alt="Profile 1"
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <img
                        src="/4.jpg"
                        width={150}
                        height={150}
                        alt="Profile 2"
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          ref={featuresRef}
          variants={fadeIn}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-50 hover:text-rose-700"
                >
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose HeartMatch?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform helps you find genuine connections based on
                  compatibility, shared interests, and values.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  icon: <Search className="h-6 w-6 text-rose-700" />,
                  title: "Smart Matching",
                  text: "Our advanced algorithm suggests compatible matches.",
                },
                {
                  icon: <MessageCircle className="h-6 w-6 text-rose-700" />,
                  title: "Secure Messaging",
                  text: "Connect privately with built-in translation.",
                },
                {
                  icon: <Users className="h-6 w-6 text-rose-700" />,
                  title: "Verified Profiles",
                  text: "All profiles are verified to ensure authenticity.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="border-none shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-2 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-rose-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-rose-200 bg-white text-rose-700 hover:bg-white hover:text-rose-700"
                >
                  How It Works
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Find Love in 3 Simple Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our streamlined process makes it easy to start your journey to
                  finding meaningful connections.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-rose-200">
                  <span className="text-xl font-bold text-rose-700">1</span>
                </div>
                <h3 className="text-xl font-bold">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Sign up and build your profile with photos, interests, and
                  what you're looking for in a partner.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-rose-200">
                  <span className="text-xl font-bold text-rose-700">2</span>
                </div>
                <h3 className="text-xl font-bold">Discover Matches</h3>
                <p className="text-muted-foreground">
                  Browse through potential matches selected specifically for you
                  based on compatibility.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-rose-200">
                  <span className="text-xl font-bold text-rose-700">3</span>
                </div>
                <h3 className="text-xl font-bold">Connect & Meet</h3>
                <p className="text-muted-foreground">
                  Start conversations with your matches and take the next step
                  to meet in person when you're ready.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section
          id="success-stories"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-50 hover:text-rose-700"
                >
                  Success Stories
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Real Love Stories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from couples who found each other through HeartMatch.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src="/placeholder.svg?height=50&width=50"
                          alt="Sarah & Michael"
                        />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Sarah & Michael</p>
                        <p className="text-xs text-muted-foreground">
                          Married 2 years
                        </p>
                      </div>
                    </div>
                    <div className="flex text-rose-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <p className="text-muted-foreground">
                      "We matched on HeartMatch and instantly connected over our
                      love for hiking. Three months later, we were inseparable."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src="/placeholder.svg?height=50&width=50"
                          alt="David & Emma"
                        />
                        <AvatarFallback>DE</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">David & Emma</p>
                        <p className="text-xs text-muted-foreground">Engaged</p>
                      </div>
                    </div>
                    <div className="flex text-rose-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <p className="text-muted-foreground">
                      "I was skeptical about online dating until I met David.
                      HeartMatch's compatibility system really works!"
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" alt="James & Olivia" />
                        <AvatarFallback>JO</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">James & Olivia</p>
                        <p className="text-xs text-muted-foreground">
                          Dating 1 year
                        </p>
                      </div>
                    </div>
                    <div className="flex text-rose-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <p className="text-muted-foreground">
                      "We would have never crossed paths if it wasn't for
                      HeartMatch. Now we can't imagine life without each other."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-rose-200 bg-white text-rose-700 hover:bg-white hover:text-rose-700"
                >
                  Pricing
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Find Your Perfect Plan
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your dating journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <h3 className="text-xl font-bold">Basic</h3>
                    <div className="text-4xl font-bold">Free</div>
                    <p className="text-muted-foreground">
                      Get started with basic matching
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Create your profile
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Browse potential matches
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Limited messaging
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Sign Up Free
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-rose-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <Badge className="bg-rose-500">Most Popular</Badge>
                    <h3 className="text-xl font-bold">Premium</h3>
                    <div className="text-4xl font-bold">
                      ₹299
                      <span className="text-base font-normal">/month</span>
                    </div>
                    <p className="text-muted-foreground">
                      Enhanced features for serious daters
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        All Basic features
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Unlimited messaging
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        See who likes you
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Advanced matching algorithms
                      </li>
                    </ul>
                    <Button className="w-full bg-rose-500 hover:bg-rose-600">
                      Get Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <h3 className="text-xl font-bold">Elite</h3>
                    <div className="text-4xl font-bold">
                      ₹499
                      <span className="text-base font-normal">/month</span>
                    </div>
                    <p className="text-muted-foreground">
                      Premium experience for dedicated daters
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        All Premium features
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Priority matching
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Profile boost monthly
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-rose-500" />
                        Dedicated relationship coach
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Get Elite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Find Your Perfect Match?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                  Join thousands of singles who have already found meaningful
                  connections on HeartMatch.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button className="bg-white text-rose-500 hover:bg-white/90 hover:text-rose-600">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-white/70">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
