class HairstyleDatabase:
    def __init__(self):
        self.face_shapes = {

            "oval": {
                "title": "Oval Face Shape",
                "emoji": "🥚",
                "color": "#ff6b6b",
                "colorLight": "rgba(255, 107, 107, 0.1)",
                "description": "Congratulations! The oval face shape is considered the most versatile and balanced. Your face is about 1.5 times longer than it is wide, with the forehead slightly wider than the jaw. Almost any hairstyle works beautifully with this shape!",
                "men": {
                    "recommended": [
                        {
                            "name": "Classic Pompadour",
                            "icon": "💇‍♂️",
                            "description": "A timeless style that adds volume on top. Slick back the sides for a clean, polished look."
                        },
                        {
                            "name": "Textured Quiff",
                            "icon": "✨",
                            "description": "Modern and stylish with natural texture and movement. Perfect for casual and formal occasions."
                        },
                        {
                            "name": "Buzz Cut",
                            "icon": "⚡",
                            "description": "A bold, low-maintenance choice that highlights your perfectly balanced proportions."
                        },
                        {
                            "name": "Side Part",
                            "icon": "🎩",
                            "description": "A classic gentleman's cut that works perfectly with oval faces. Clean and professional."
                        },
                        {
                            "name": "Medium Length Waves",
                            "icon": "🌊",
                            "description": "Let your hair grow to medium length for a relaxed, effortless style."
                        },
                        {
                            "name": "Slick Back",
                            "icon": "🔥",
                            "description": "Sleek and sophisticated. Use a strong-hold product for that polished finish."
                        }
                    ],
                    "avoid": [
                        "Heavy bangs that cover the forehead completely",
                        "Styles with excessive height that elongate the face",
                        "Overly bulky styles on the sides"
                    ],
                    "celebrities": "Ryan Gosling, George Clooney, Brad Pitt, Zayn Malik, Henry Cavill"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Long Layers",
                            "icon": "💁‍♀️",
                            "description": "Flowing layers that frame your face beautifully and add graceful movement."
                        },
                        {
                            "name": "Classic Bob",
                            "icon": "✂️",
                            "description": "A chin-length or long bob that accentuates your balanced proportions."
                        },
                        {
                            "name": "Beach Waves",
                            "icon": "🌊",
                            "description": "Effortless, tousled waves that add texture and a relaxed, chic vibe."
                        },
                        {
                            "name": "Pixie Cut",
                            "icon": "⭐",
                            "description": "A bold, short cut that showcases your face shape perfectly."
                        },
                        {
                            "name": "Side-Swept Bangs",
                            "icon": "💫",
                            "description": "Soft bangs swept to one side for a romantic, elegant look."
                        },
                        {
                            "name": "High Ponytail",
                            "icon": "🎀",
                            "description": "A sleek high pony that shows off your balanced features beautifully."
                        }
                    ],
                    "avoid": [
                        "Styles that add too much volume at the cheeks",
                        "Very heavy, blunt bangs",
                        "Overly flat hairstyles with no volume"
                    ],
                    "celebrities": "Bella Hadid, Jessica Alba, Beyonce, Charlize Theron, Julia Roberts"
                }
            },

            "round": {
                "title": "Round Face Shape",
                "emoji": "🔵",
                "color": "#0984e3",
                "colorLight": "rgba(9, 132, 227, 0.1)",
                "description": "Your face has equal width and length with soft, rounded edges. The cheekbones are the widest part, and you have a rounded chin. The key is to create the illusion of length and add angles to your look.",
                "men": {
                    "recommended": [
                        {
                            "name": "High Fade with Texture",
                            "icon": "💇‍♂️",
                            "description": "The high fade adds height and length while slimming the sides of the face."
                        },
                        {
                            "name": "Angular Fringe",
                            "icon": "📐",
                            "description": "An asymmetric fringe that creates angular lines to add structure and definition."
                        },
                        {
                            "name": "Faux Hawk",
                            "icon": "🦅",
                            "description": "Creates vertical height and draws the eye upward, elongating the face."
                        },
                        {
                            "name": "Spiky Hair",
                            "icon": "⚡",
                            "description": "Spikes on top add vertical dimension and make the face appear longer."
                        },
                        {
                            "name": "Disconnected Undercut",
                            "icon": "✂️",
                            "description": "Sharp contrast between top and sides creates strong angular lines."
                        },
                        {
                            "name": "Side Part Comb Over",
                            "icon": "🎩",
                            "description": "The side part creates an asymmetrical look that breaks the roundness."
                        }
                    ],
                    "avoid": [
                        "Very short, rounded haircuts that mirror face shape",
                        "Center-parted chin-length cuts",
                        "Rounded bowl cuts",
                        "Styles with lots of volume on the sides"
                    ],
                    "celebrities": "Leonardo DiCaprio, Jack Black, Elijah Wood, Zac Efron"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Long Layered Cut",
                            "icon": "💁‍♀️",
                            "description": "Long layers that fall below the chin elongate the face and add angles."
                        },
                        {
                            "name": "Deep Side Part",
                            "icon": "↗️",
                            "description": "An off-center part creates asymmetry that slims the round appearance."
                        },
                        {
                            "name": "Lob (Long Bob)",
                            "icon": "✂️",
                            "description": "A lob that falls below the jawline with soft layers to elongate."
                        },
                        {
                            "name": "High Bun / Top Knot",
                            "icon": "🎀",
                            "description": "Adds height on top, creating the illusion of a longer, slimmer face."
                        },
                        {
                            "name": "Side-Swept Bangs",
                            "icon": "💫",
                            "description": "Diagonal lines from side-swept bangs create flattering angles."
                        },
                        {
                            "name": "Voluminous Curls",
                            "icon": "🌀",
                            "description": "Big, loose curls below the chin add length and draw attention downward."
                        }
                    ],
                    "avoid": [
                        "Chin-length bobs that emphasize roundness",
                        "Blunt, straight-across bangs",
                        "Tight curls at cheek level",
                        "One-length cuts without layers"
                    ],
                    "celebrities": "Selena Gomez, Chrissy Teigen, Miranda Kerr, Kirsten Dunst"
                }
            },

            "square": {
                "title": "Square Face Shape",
                "emoji": "🟩",
                "color": "#00b894",
                "colorLight": "rgba(0, 184, 148, 0.1)",
                "description": "Your face features a strong, angular jawline with a forehead, cheekbones, and jawline of similar width. This powerful face shape looks great with styles that soften the angles while maintaining your strong features.",
                "men": {
                    "recommended": [
                        {
                            "name": "Textured Crop",
                            "icon": "🌾",
                            "description": "A textured crop softens angular features while keeping a modern look."
                        },
                        {
                            "name": "Classic Taper",
                            "icon": "💇‍♂️",
                            "description": "Gradually tapered sides with some length on top balance the strong jaw."
                        },
                        {
                            "name": "Messy / Tousled Style",
                            "icon": "🌊",
                            "description": "Messy textures break up the rigid lines of a square face beautifully."
                        },
                        {
                            "name": "Short Beard + Fade",
                            "icon": "🧔",
                            "description": "A well-groomed beard with a fade softens the jawline beautifully."
                        },
                        {
                            "name": "Brushed Back Medium",
                            "icon": "✨",
                            "description": "Medium-length hair brushed back adds dimension and softness."
                        },
                        {
                            "name": "Curly Top",
                            "icon": "🌀",
                            "description": "Natural curls on top add softness and round out the angular edges."
                        }
                    ],
                    "avoid": [
                        "Very flat, straight hairstyles that emphasize the box shape",
                        "Extremely short buzz cuts that highlight the jawline",
                        "Center parts with straight hair"
                    ],
                    "celebrities": "David Beckham, Brad Pitt, Nick Bateman, Chris Hemsworth"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Soft Waves / Curls",
                            "icon": "🌊",
                            "description": "Soft, flowing waves soften the angular jawline beautifully."
                        },
                        {
                            "name": "Layered Shoulder Length",
                            "icon": "💁‍♀️",
                            "description": "Layers around the face soften the strong angles of the jawline."
                        },
                        {
                            "name": "Wispy Bangs",
                            "icon": "💫",
                            "description": "Light, wispy bangs soften the strong, horizontal forehead line."
                        },
                        {
                            "name": "Textured Lob",
                            "icon": "✂️",
                            "description": "A textured lob with face-framing layers to soften the jawline."
                        },
                        {
                            "name": "Side Part with Volume",
                            "icon": "🎀",
                            "description": "A side part with volume on one side creates asymmetry and softness."
                        },
                        {
                            "name": "Long Flowing Layers",
                            "icon": "🌸",
                            "description": "Long hair with cascading layers draws attention away from the jaw."
                        }
                    ],
                    "avoid": [
                        "Blunt, straight bobs at jaw level",
                        "Severe, pulled-back hairstyles",
                        "Straight, heavy bangs",
                        "One-length cuts that end at the jaw"
                    ],
                    "celebrities": "Angelina Jolie, Olivia Wilde, Keira Knightley, Rosario Dawson"
                }
            },

            "heart": {
                "title": "Heart Face Shape",
                "emoji": "💜",
                "color": "#6c5ce7",
                "colorLight": "rgba(108, 92, 231, 0.1)",
                "description": "Your face is widest at the forehead and cheekbones, narrowing to a pointed chin. Often featuring a widow's peak, this romantic shape looks best with styles that add width at the jaw and minimize the forehead.",
                "men": {
                    "recommended": [
                        {
                            "name": "Medium Length Side Part",
                            "icon": "💇‍♂️",
                            "description": "A side part with medium length balances the wider forehead naturally."
                        },
                        {
                            "name": "Textured Fringe",
                            "icon": "🌾",
                            "description": "A textured fringe covers part of the forehead, balancing proportions."
                        },
                        {
                            "name": "Shaggy / Layered Cut",
                            "icon": "🌊",
                            "description": "A relaxed, layered style that adds width around the ears and jaw."
                        },
                        {
                            "name": "Crew Cut with Texture",
                            "icon": "⚡",
                            "description": "A textured crew cut that doesn't add too much height on top."
                        },
                        {
                            "name": "Swept-Back Medium Hair",
                            "icon": "✨",
                            "description": "Medium-length hair swept back for a balanced, stylish look."
                        },
                        {
                            "name": "Chin-Length Style",
                            "icon": "🎩",
                            "description": "Hair that reaches the chin adds visual width at the narrow jawline."
                        }
                    ],
                    "avoid": [
                        "Styles with too much volume on top",
                        "Very short sides with tall tops",
                        "Slicked-back styles that fully expose the wide forehead"
                    ],
                    "celebrities": "Ryan Reynolds, Justin Timberlake, Scott Eastwood, Channing Tatum"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Side-Swept Bangs",
                            "icon": "💫",
                            "description": "Side-swept bangs minimize a wide forehead while framing the face."
                        },
                        {
                            "name": "Chin-Length Bob",
                            "icon": "✂️",
                            "description": "A bob that hits at the chin adds width where the face narrows."
                        },
                        {
                            "name": "Loose Waves Below Chin",
                            "icon": "🌊",
                            "description": "Waves that start below the cheeks add volume at the jawline."
                        },
                        {
                            "name": "Curtain Bangs",
                            "icon": "🌸",
                            "description": "Parted bangs that frame the face and minimize the wide forehead."
                        },
                        {
                            "name": "Mid-Length with Layers",
                            "icon": "💁‍♀️",
                            "description": "Layers starting at the chin add width to the lower face."
                        },
                        {
                            "name": "Textured Pixie",
                            "icon": "⭐",
                            "description": "A textured pixie with volume on the sides and side-swept bangs."
                        }
                    ],
                    "avoid": [
                        "Voluminous styles at the crown",
                        "Styles that taper at the chin",
                        "Slicked-back ponytails without bangs"
                    ],
                    "celebrities": "Reese Witherspoon, Scarlett Johansson, Kourtney Kardashian, Taylor Swift"
                }
            },

            "oblong": {
                "title": "Oblong Face Shape",
                "emoji": "🟡",
                "color": "#e17055",
                "colorLight": "rgba(225, 112, 85, 0.1)",
                "description": "Your face is longer than it is wide, with a long, straight cheek line. The forehead, cheekbones, and jawline are about the same width. The goal is to create the illusion of width and avoid adding more length.",
                "men": {
                    "recommended": [
                        {
                            "name": "Side-Swept Fringe",
                            "icon": "💇‍♂️",
                            "description": "A fringe that sweeps across the forehead reduces the appearance of length."
                        },
                        {
                            "name": "Medium Length Messy",
                            "icon": "🌊",
                            "description": "Medium-length hair with volume on the sides adds width to the face."
                        },
                        {
                            "name": "Classic Side Part",
                            "icon": "🎩",
                            "description": "A low side part with moderate volume creates flattering horizontal lines."
                        },
                        {
                            "name": "Textured Crop with Bangs",
                            "icon": "🌾",
                            "description": "A cropped style with bangs shortens the visual length of the face."
                        },
                        {
                            "name": "Layered Medium Cut",
                            "icon": "✂️",
                            "description": "Layers add volume to the sides, creating width and balance."
                        },
                        {
                            "name": "Curly / Wavy Texture",
                            "icon": "🌀",
                            "description": "Natural curls and waves add width and volume on the sides."
                        }
                    ],
                    "avoid": [
                        "Very long, straight hairstyles",
                        "Tall pompadours or quiffs",
                        "Very short sides with long top",
                        "Slicked-back styles"
                    ],
                    "celebrities": "Adam Levine, Ben Affleck, Keanu Reeves, Adam Driver"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Full Bangs",
                            "icon": "💁‍♀️",
                            "description": "Straight-across bangs shorten the face's appearance dramatically."
                        },
                        {
                            "name": "Shoulder-Length Waves",
                            "icon": "🌊",
                            "description": "Waves at shoulder length add width and volume to balance length."
                        },
                        {
                            "name": "Voluminous Curls",
                            "icon": "🌀",
                            "description": "Big, voluminous curls add width and create more balanced proportions."
                        },
                        {
                            "name": "Short Bob with Bangs",
                            "icon": "✂️",
                            "description": "A short bob with bangs minimizes face length and adds width."
                        },
                        {
                            "name": "Layered Cut with Volume",
                            "icon": "💫",
                            "description": "Layers that add volume around the cheeks widen the face visually."
                        },
                        {
                            "name": "Chin-Length Cut",
                            "icon": "⭐",
                            "description": "A cut at the chin creates a horizontal line, adding width."
                        }
                    ],
                    "avoid": [
                        "Very long, straight hair without layers",
                        "Center parts that elongate further",
                        "Styles with too much height on top"
                    ],
                    "celebrities": "Sarah Jessica Parker, Liv Tyler, Hilary Swank, Gisele Bundchen"
                }
            },

            "diamond": {
                "title": "Diamond Face Shape",
                "emoji": "💎",
                "color": "#00b894",
                "colorLight": "rgba(0, 184, 148, 0.1)",
                "description": "Your face features narrow forehead and jawline with wide, high cheekbones being the most prominent feature. This unique and angular face shape is quite rare and looks stunning with styles that add width at the forehead or jawline.",
                "men": {
                    "recommended": [
                        {
                            "name": "Textured Fringe",
                            "icon": "🌾",
                            "description": "A fringe adds width to the narrow forehead, balancing the cheekbones."
                        },
                        {
                            "name": "Side Part with Volume",
                            "icon": "💇‍♂️",
                            "description": "Volume on one side adds width at the forehead level."
                        },
                        {
                            "name": "Chin-Length Layers",
                            "icon": "✂️",
                            "description": "Longer styles reaching the chin add width to the narrow jawline."
                        },
                        {
                            "name": "Messy Quiff",
                            "icon": "✨",
                            "description": "A textured quiff adds width at the forehead without being too structured."
                        },
                        {
                            "name": "Medium Length Swept Back",
                            "icon": "🌊",
                            "description": "Medium hair swept back with some volume creates balanced proportions."
                        },
                        {
                            "name": "Tousled Top with Taper",
                            "icon": "🎩",
                            "description": "A tapered cut with tousled texture widens the forehead area."
                        }
                    ],
                    "avoid": [
                        "Styles that add width at the cheekbones",
                        "Very short cropped hairstyles",
                        "Slicked back with tight sides"
                    ],
                    "celebrities": "Johnny Depp, Robert Pattinson, Ian Somerhalder"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Side-Swept Bangs",
                            "icon": "💫",
                            "description": "Bangs add width and fullness to the narrow forehead area."
                        },
                        {
                            "name": "Chin-Length Bob",
                            "icon": "✂️",
                            "description": "A bob at chin level adds width to the narrow jawline."
                        },
                        {
                            "name": "Tucked Behind Ears",
                            "icon": "💁‍♀️",
                            "description": "Tucking hair behind ears showcases your beautiful cheekbones."
                        },
                        {
                            "name": "Voluminous Layers",
                            "icon": "🌊",
                            "description": "Layers that flip out at the jawline add width where needed."
                        },
                        {
                            "name": "Half-Up Half-Down",
                            "icon": "🎀",
                            "description": "This style adds volume on top while keeping width around the jaw."
                        },
                        {
                            "name": "Soft Curls at Chin Level",
                            "icon": "🌀",
                            "description": "Curls at chin level add fullness to the narrow jaw area."
                        }
                    ],
                    "avoid": [
                        "Styles with volume only at the cheeks",
                        "Pulled-back styles exposing narrow areas",
                        "Very straight, flat hairstyles"
                    ],
                    "celebrities": "Rihanna, Vanessa Hudgens, Halle Berry, Ashley Greene"
                }
            },

            "triangle": {
                "title": "Triangle Face Shape",
                "emoji": "🔶",
                "color": "#e17055",
                "colorLight": "rgba(225, 112, 85, 0.1)",
                "description": "Your face is widest at the jawline and narrows at the forehead and cheekbones. This unique shape looks best with styles that add volume and width at the top to balance the wider jaw.",
                "men": {
                    "recommended": [
                        {
                            "name": "Voluminous Quiff",
                            "icon": "💇‍♂️",
                            "description": "A quiff adds height and volume at the forehead to balance the wide jaw."
                        },
                        {
                            "name": "Side Part with Volume",
                            "icon": "🎩",
                            "description": "A deep side part with volume creates width at the forehead."
                        },
                        {
                            "name": "Longer Top, Short Sides",
                            "icon": "✂️",
                            "description": "Extra length on top draws the eye upward, away from the jawline."
                        },
                        {
                            "name": "Pompadour",
                            "icon": "✨",
                            "description": "A pompadour adds significant height and width at the top."
                        },
                        {
                            "name": "Textured Fringe",
                            "icon": "🌾",
                            "description": "A wide, textured fringe adds visual width to the narrow forehead."
                        },
                        {
                            "name": "Layered Medium Length",
                            "icon": "🌊",
                            "description": "Medium-length layers add volume at the temples and forehead area."
                        }
                    ],
                    "avoid": [
                        "Styles that are flat on top",
                        "Buzz cuts that show the head's natural shape",
                        "Chin-length styles adding width at the jaw"
                    ],
                    "celebrities": "Justin Theroux, Adrien Brody"
                },
                "women": {
                    "recommended": [
                        {
                            "name": "Volume at the Crown",
                            "icon": "👑",
                            "description": "Add volume at the top and crown to balance the wider jawline."
                        },
                        {
                            "name": "Side-Swept Bangs",
                            "icon": "💫",
                            "description": "Wide side-swept bangs create the illusion of a wider forehead."
                        },
                        {
                            "name": "Short Bob with Layers",
                            "icon": "✂️",
                            "description": "A layered bob above the jaw with volume at the temples."
                        },
                        {
                            "name": "Voluminous Updo",
                            "icon": "🎀",
                            "description": "An updo with volume on top draws attention to the upper face."
                        },
                        {
                            "name": "Soft Waves from Crown",
                            "icon": "🌊",
                            "description": "Waves starting at the crown add width to the upper face."
                        },
                        {
                            "name": "Pixie with Volume",
                            "icon": "⭐",
                            "description": "A voluminous pixie cut adds fullness at the top of the head."
                        }
                    ],
                    "avoid": [
                        "Straight, flat hairstyles",
                        "Styles that add volume at the jawline",
                        "Center parts without volume"
                    ],
                    "celebrities": "Kelly Osbourne, Minnie Driver, Keleigh Sperry"
                }
            }
        }

    def get_all_shapes(self):
        return list(self.face_shapes.keys())

    def get_shape_data(self, shape):
        return self.face_shapes.get(shape)

    def get_recommendations(self, shape, gender):
        shape_data = self.face_shapes.get(shape)
        if shape_data and gender in shape_data:
            return {
                "title": shape_data["title"],
                "emoji": shape_data["emoji"],
                "color": shape_data["color"],
                "colorLight": shape_data["colorLight"],
                "description": shape_data["description"],
                "recommended": shape_data[gender]["recommended"],
                "avoid": shape_data[gender]["avoid"],
                "celebrities": shape_data[gender]["celebrities"]
            }
        return None


# Create one instance to use everywhere
db = HairstyleDatabase()