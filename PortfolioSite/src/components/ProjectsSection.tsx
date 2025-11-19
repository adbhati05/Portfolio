import Robot from '../projects/Robot.jpg';
import SpotifyLogo from '../projects/Spotify Logo.png';
import MarketPrediction from '../projects/Market Prediction.jpg'
import FitLog from '../projects/FitLog.jpg';
import DamageDetection from '../projects/Damage Detection.webp';

const projects = [
    { 
        id: 1,
        name: "Self-Made Motorized Robot",
        description: "Motorized robot capable of autonomous navigation and task execution on an obstacle course.",
        image: Robot,
        tags: ["C++", "Electronics", "Robotics"],
        githubURL: "#",
    },
    {
        id: 2,
        name: "Artist Search Website",
        description: "Flask web application that allows users to search for a specific artist's information.",
        image: SpotifyLogo,
        tags: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Spotify Web API"],
        githubURL: "#",
    },
    {
        id: 3,
        name: "QuantiFiAI - Quant Trading System",
        description: "Quantitative trading system that utilizes numerous ML models for market regime analysis and prediction.",
        image: MarketPrediction,
        tags: ["Python", "PyTorch", "Sci-Kit Learn", "Pandas"],
        githubURL: "#",
    },
    {
        id: 4,
        name: "FitLog - Outfit Logging Web App",
        description: "Social media platform that allows users to post worn outfits, interact with other users/posts, and plan future outfits.",
        image: FitLog,
        tags: ["React", "HTML", "CSS", "TypeScript", "Firebase"],
        githubURL: "#",
    },
    {
        id: 5,
        name: "Damage Detector",
        description: "Object detection model that identifies and classifies the type of damage present on vehicles from images.",
        image: DamageDetection,
        tags: ["Python", "PyTorch", "NumPy", "YOLOv8", "Docker", "CVAT"],
        githubURL: "#",
    }
]

export const ProjectsSection = () => {
    return (
        <div></div>
    );
}

export default ProjectsSection;