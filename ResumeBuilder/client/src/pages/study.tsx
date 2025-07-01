import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import calmMeadowImg from '@assets/CalmMeadow_1751331864443.jpg';
import enchantedForestImg from '@assets/EnchantedForest_1751331864443.jpg';
import cozyRainImg from '@assets/CozyRain_1751331864442.jpg';
import cityNightImg from '@assets/CityNight_1751331864442.jpg';
import libraryImg from '@assets/Library_1751331864441.jpg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Music, 
  Volume2, 
  Coffee, 
  TreePine, 
  CloudRain, 
  Building2,
  Timer,
  Clock,
  ArrowLeft,
  Home,
  BookOpen as Library,
  RefreshCw,
  Quote
} from 'lucide-react';

type TimerType = 'pomodoro' | 'regular';
type Theme = 'meadow' | 'forest' | 'rainy' | 'city' | 'library';

interface StudySession {
  id: number;
  timerType: TimerType;
  duration: number;
  theme: Theme;
  completed: boolean;
  createdAt: Date;
}

const themes = {
  meadow: {
    name: 'Calm Meadow',
    icon: Coffee,
    bg: 'bg-gradient-to-br from-amber-200 via-green-300 to-yellow-300',
    overlay: 'bg-amber-900/20',
    accent: 'text-amber-800',
    button: 'bg-amber-500 hover:bg-amber-600',
    card: 'bg-white/80 backdrop-blur-md border-amber-200',
    description: 'Peaceful wildflower meadow with warm sunshine',
    bgImage: '@assets/CalmMeadow_1751331864443.jpg'
  },
  forest: {
    name: 'Enchanted Forest',
    icon: TreePine,
    bg: 'bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600',
    overlay: 'bg-emerald-900/40',
    accent: 'text-emerald-100',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    card: 'bg-white/70 backdrop-blur-md border-emerald-300',
    description: 'Mystical forest with dappled sunlight',
    bgImage: '@assets/EnchantedForest_1751331864443.jpg'
  },
  rainy: {
    name: 'Cozy Rain',
    icon: CloudRain,
    bg: 'bg-gradient-to-br from-slate-500 via-gray-400 to-blue-400',
    overlay: 'bg-slate-900/50',
    accent: 'text-slate-100',
    button: 'bg-slate-500 hover:bg-slate-600',
    card: 'bg-white/60 backdrop-blur-md border-slate-300',
    description: 'Warm indoors with gentle rain outside',
    bgImage: '@assets/CozyRain_1751331864442.jpg'
  },
  city: {
    name: 'City Night',
    icon: Building2,
    bg: 'bg-gradient-to-br from-indigo-900 via-slate-800 to-purple-900',
    overlay: 'bg-slate-900/40',
    accent: 'text-indigo-200',
    button: 'bg-indigo-500 hover:bg-indigo-600',
    card: 'bg-white/70 backdrop-blur-md border-indigo-300',
    description: 'Urban skyline under moonlit sky',
    bgImage: '@assets/CityNight_1751331864442.jpg'
  },
  library: {
    name: 'Classic Library',
    icon: Library,
    bg: 'bg-gradient-to-br from-amber-800 via-orange-900 to-red-900',
    overlay: 'bg-amber-900/30',
    accent: 'text-amber-100',
    button: 'bg-amber-600 hover:bg-amber-700',
    card: 'bg-amber-50/80 backdrop-blur-md border-amber-400',
    description: 'Traditional library with endless knowledge',
    bgImage: '@assets/Library_1751331864441.jpg'
  }
};

const motivationalQuotes = [
  "The expert in anything was once a beginner.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It always seems impossible until it's done.",
  "Education is the most powerful weapon which you can use to change the world.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "In the middle of difficulty lies opportunity.",
  "The journey of a thousand miles begins with one step.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days."
];

export default function StudyPage() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('meadow');
  const [timerType, setTimerType] = useState<TimerType>('pomodoro');
  const [customDuration, setCustomDuration] = useState([25]);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroRound, setPomodoroRound] = useState(1);
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [volume, setVolume] = useState([50]);
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [cardOrder, setCardOrder] = useState(['environment', 'quotes', 'spotify']);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const theme = themes[currentTheme];
  const ThemeIcon = theme.icon;

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (timerType === 'pomodoro') {
      if (!isBreak) {
        // Work session completed, start break
        setIsBreak(true);
        const breakDuration = pomodoroRound % 4 === 0 ? 15 : 5; // Long break every 4 rounds
        setTimeLeft(breakDuration * 60);
        toast({
          title: "Work session complete!",
          description: `Time for a ${breakDuration}-minute break.`,
        });
      } else {
        // Break completed, start next work session
        setIsBreak(false);
        setPomodoroRound(prev => prev + 1);
        setTimeLeft(25 * 60);
        toast({
          title: "Break complete!",
          description: "Ready for your next focus session?",
        });
      }
    } else {
      toast({
        title: "Timer complete!",
        description: "Great work! Time for a well-deserved break.",
      });
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setPomodoroRound(1);
    
    if (timerType === 'pomodoro') {
      setTimeLeft(25 * 60);
    } else {
      setTimeLeft(customDuration[0] * 60);
    }
  };

  const handleTimerTypeChange = (type: TimerType) => {
    setTimerType(type);
    setIsRunning(false);
    setIsBreak(false);
    setPomodoroRound(1);
    
    if (type === 'pomodoro') {
      setTimeLeft(25 * 60);
    } else {
      setTimeLeft(customDuration[0] * 60);
    }
  };

  const handleCustomDurationChange = (value: number[]) => {
    setCustomDuration(value);
    if (timerType === 'regular' && !isRunning) {
      setTimeLeft(value[0] * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    if (timerType === 'pomodoro') {
      return isBreak ? (pomodoroRound % 4 === 0 ? 15 : 5) * 60 : 25 * 60;
    }
    return customDuration[0] * 60;
  };

  const getProgress = () => {
    const total = getTotalDuration();
    return ((total - timeLeft) / total) * 100;
  };

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    
    if (!draggedCard || draggedCard === targetCardId) {
      setDraggedCard(null);
      return;
    }

    const newOrder = [...cardOrder];
    const draggedIndex = newOrder.indexOf(draggedCard);
    const targetIndex = newOrder.indexOf(targetCardId);
    
    // Remove dragged item and insert at target position
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedCard);
    
    setCardOrder(newOrder);
    setDraggedCard(null);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  // Card components
  const EnvironmentCard = () => (
    <Card 
      className={`${theme.card} border-2 cursor-move transition-all duration-200 ${
        draggedCard === 'environment' ? 'scale-105 rotate-2 shadow-xl opacity-80' : 'hover:shadow-md'
      } ${draggedCard && draggedCard !== 'environment' ? 'opacity-60' : ''}`}
      draggable
      onDragStart={(e) => handleDragStart(e, 'environment')}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, 'environment')}
      onDragEnd={handleDragEnd}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThemeIcon className="h-5 w-5" />
            Environment
          </div>
          <div className="text-xs opacity-50">⋮⋮</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(themes).map(([key, themeData]) => {
            const Icon = themeData.icon;
            return (
              <Button
                key={key}
                variant={currentTheme === key ? 'default' : 'outline'}
                onClick={() => setCurrentTheme(key as Theme)}
                className="flex flex-col items-center gap-2 h-auto p-3"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{themeData.name}</span>
              </Button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {theme.description}
        </p>
      </CardContent>
    </Card>
  );

  const QuotesCard = () => (
    <Card 
      className={`${theme.card} border-2 cursor-move transition-all duration-200 ${
        draggedCard === 'quotes' ? 'scale-105 rotate-2 shadow-xl opacity-80' : 'hover:shadow-md'
      } ${draggedCard && draggedCard !== 'quotes' ? 'opacity-60' : ''}`}
      draggable
      onDragStart={(e) => handleDragStart(e, 'quotes')}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, 'quotes')}
      onDragEnd={handleDragEnd}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Daily Inspiration
          </div>
          <div className="text-xs opacity-50">⋮⋮</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg">
          {/* Old manuscript styling */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <pattern id="paper" patternUnits="userSpaceOnUse" width="100" height="100">
                    <rect width="100" height="100" fill="#fef3c7"/>
                    <path d="M0 20h100M0 40h100M0 60h100M0 80h100" stroke="#d97706" stroke-width="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#paper)"/>
              </svg>
            `)}")`,
          }} />
          
          <div className="relative z-10">
            <p className="text-amber-800 text-lg font-serif italic leading-relaxed text-center mb-4" style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              "{currentQuote}"
            </p>
            
            <div className="flex justify-center">
              <Button
                onClick={getNewQuote}
                variant="outline"
                size="sm"
                className="bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-800"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </div>
          </div>
          
          {/* Decorative corners */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-amber-400 opacity-50" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-amber-400 opacity-50" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-amber-400 opacity-50" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-amber-400 opacity-50" />
        </div>
      </CardContent>
    </Card>
  );

  const SpotifyCard = () => (
    <Card 
      className={`${theme.card} border-2 cursor-move transition-all duration-200 ${
        draggedCard === 'spotify' ? 'scale-105 rotate-2 shadow-xl opacity-80' : 'hover:shadow-md'
      } ${draggedCard && draggedCard !== 'spotify' ? 'opacity-60' : ''}`}
      draggable
      onDragStart={(e) => handleDragStart(e, 'spotify')}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, 'spotify')}
      onDragEnd={handleDragEnd}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Background Music
          </div>
          <div className="text-xs opacity-50">⋮⋮</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Spotify Playlist URL</label>
          <input
            type="url"
            placeholder="https://open.spotify.com/playlist/..."
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        
        {spotifyUrl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <span className="text-sm font-medium">Volume: {volume[0]}%</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            
            {/* Spotify Embed */}
            <div className="mt-4">
              <iframe
                src={spotifyUrl.replace('playlist/', 'embed/playlist/')}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                style={{ opacity: volume[0] / 100 }}
              />
            </div>
          </div>
        )}
        
        {!spotifyUrl && (
          <div className="text-center text-sm text-muted-foreground">
            <p>Add a Spotify playlist URL to play background music while you study</p>
            <p className="mt-1">Try: Lo-fi, Classical, or Nature sounds</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderCard = (cardId: string) => {
    switch (cardId) {
      case 'environment':
        return <EnvironmentCard key="environment" />;
      case 'quotes':
        return <QuotesCard key="quotes" />;
      case 'spotify':
        return <SpotifyCard key="spotify" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative transition-all duration-1000">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            currentTheme === 'meadow' ? calmMeadowImg :
            currentTheme === 'forest' ? enchantedForestImg :
            currentTheme === 'rainy' ? cozyRainImg :
            currentTheme === 'city' ? cityNightImg :
            currentTheme === 'library' ? libraryImg : calmMeadowImg
          })`
        }}
      />
      
      {/* Gradient overlay to ensure text readability */}
      <div className={`absolute inset-0 ${theme.bg} opacity-60`} />
      
      {/* Theme-specific overlay */}
      <div className={`absolute inset-0 ${theme.overlay}`} />
      
      {/* Floating particles for ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className={`${theme.card} border-2 hover:bg-white/20`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
          
          <div className="text-center">
            <h1 className={`text-2xl font-bold ${theme.accent}`}>
              Disha Purkar
            </h1>
            <p className={`text-sm ${theme.accent}/80`}>
              Study Session
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => window.location.href = '/#education'}
              variant="outline"
              size="sm"
              className={`${theme.card} border-2 hover:bg-white/20 hidden md:flex`}
            >
              Education
            </Button>
            <Button
              onClick={() => window.location.href = '/#leadership'}
              variant="outline"
              size="sm"
              className={`${theme.card} border-2 hover:bg-white/20 hidden md:flex`}
            >
              Leadership
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className={`${theme.card} border-2 hover:bg-white/20`}
            >
              <Home className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
          </div>
        </motion.div>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${theme.accent}`}>
            Study with Me
          </h1>
          <p className={`text-lg ${theme.accent}/80`}>
            Focus, achieve, and grow together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <Card className={`${theme.card} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Focus Timer
                  {timerType === 'pomodoro' && (
                    <Badge variant="secondary" className="ml-2">
                      Round {pomodoroRound} {isBreak ? '(Break)' : '(Focus)'}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timer Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timer Method</label>
                  <div className="flex gap-2">
                    <Button
                      variant={timerType === 'pomodoro' ? 'default' : 'outline'}
                      onClick={() => handleTimerTypeChange('pomodoro')}
                      className="flex items-center gap-2"
                    >
                      <Coffee className="h-4 w-4" />
                      Pomodoro
                    </Button>
                    <Button
                      variant={timerType === 'regular' ? 'default' : 'outline'}
                      onClick={() => handleTimerTypeChange('regular')}
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Custom Timer
                    </Button>
                  </div>
                </div>

                {/* Custom Duration for Regular Timer */}
                {timerType === 'regular' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Duration: {customDuration[0]} minutes
                    </label>
                    <Slider
                      value={customDuration}
                      onValueChange={handleCustomDurationChange}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                      disabled={isRunning}
                    />
                  </div>
                )}

                {/* Timer Display */}
                <div className="text-center space-y-4">
                  <div className="text-6xl font-mono font-bold text-slate-800">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress value={getProgress()} className="w-full h-2" />
                  
                  {/* Timer Controls */}
                  <div className="flex justify-center gap-4">
                    {!isRunning ? (
                      <Button
                        onClick={startTimer}
                        size="lg"
                        className={`${theme.button} text-white`}
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button
                        onClick={pauseTimer}
                        size="lg"
                        variant="outline"
                      >
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button
                      onClick={resetTimer}
                      size="lg"
                      variant="outline"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customizable Settings & Controls */}
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className={`text-lg font-medium ${theme.accent} mb-2`}>
                Customize Your Study Space
              </h3>
              <p className={`text-sm ${theme.accent}/80`}>
                Drag and drop the cards below to arrange them as you like
              </p>
            </div>
            
            {cardOrder.map((cardId) => renderCard(cardId))}
          </div>
        </div>
      </div>
    </div>
  );
}