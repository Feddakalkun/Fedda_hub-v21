import { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, Video } from 'lucide-react';
import { RichHome } from './components/layout/RichHome';
import { ImageSectionCards } from './components/layout/ImageSectionCards';
import { VideoSectionCards } from './components/layout/VideoSectionCards';
import { TopSystemStrip } from './components/ui/TopSystemStrip';
import { ToastProvider } from './components/ui/Toast';
import { ComfyExecutionProvider } from './contexts/ComfyExecutionContext';
import { ImageStudioPage } from './pages/ImageStudioPage';
import { VideoStudioPage } from './pages/VideoStudioPage';
import { GalleryPage } from './pages/GalleryPage';
import { LibraryPage } from './pages/LibraryPage';
import { OllamaModelsPage } from './pages/OllamaModelsPage';
import { UIAgentPage } from './pages/UIAgentPage';
import {
  ACTIVE_TAB_STORAGE_KEY,
  APP_VERSION_LABEL,
  DEFAULT_TAB,
  ENABLED_MODULES,
  PAGE_META,
  VALID_TABS,
} from './modules/registry';

type ViewMode = 'home' | 'image-section' | 'video-section' | 'workspace';

type AppLocation = {
  view: ViewMode;
  activeTab: string;
};

function resolveTab(tab: string | null | undefined): string {
  return tab && VALID_TABS.has(tab) ? tab : DEFAULT_TAB;
}

function readActiveTab(): string {
  try {
    return resolveTab(localStorage.getItem(ACTIVE_TAB_STORAGE_KEY));
  } catch {
    return DEFAULT_TAB;
  }
}

function encodeLocation(location: AppLocation): string {
  if (location.view === 'home') return '#/home';
  if (location.view === 'image-section') return '#/image';
  if (location.view === 'video-section') return '#/video';
  return `#/tab/${encodeURIComponent(resolveTab(location.activeTab))}`;
}

function readLocationFromHash(): AppLocation {
  const fallbackTab = readActiveTab();
  if (typeof window === 'undefined') return { view: 'home', activeTab: fallbackTab };

  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash || hash === 'home') return { view: 'home', activeTab: fallbackTab };
  if (hash === 'image') return { view: 'image-section', activeTab: fallbackTab };
  if (hash === 'video') return { view: 'video-section', activeTab: fallbackTab };

  if (hash.startsWith('tab/')) {
    return { view: 'workspace', activeTab: resolveTab(decodeURIComponent(hash.slice(4))) };
  }

  if (VALID_TABS.has(hash)) return { view: 'workspace', activeTab: hash };
  return { view: 'home', activeTab: fallbackTab };
}

function parentViewForTab(tab: string): ViewMode {
  const module = ENABLED_MODULES.find((entry) => entry.tabs.includes(tab));
  if (module?.area === 'image') return 'image-section';
  if (module?.area === 'video') return 'video-section';
  return 'home';
}

function FeddaApp() {
  const initialLocation = readLocationFromHash();
  const [view, setView] = useState<ViewMode>(initialLocation.view);
  const [activeTab, setActiveTab] = useState(initialLocation.activeTab);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    } catch {}
  }, [activeTab]);

  useEffect(() => {
    const syncFromHash = () => {
      const next = readLocationFromHash();
      setView(next.view);
      setActiveTab(next.activeTab);
    };

    if (typeof window !== 'undefined' && !window.location.hash) {
      window.history.replaceState({ fedda: true }, '', encodeLocation({ view, activeTab }));
    }

    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  const navigate = (location: AppLocation, mode: 'push' | 'replace' = 'push') => {
    const next = { ...location, activeTab: resolveTab(location.activeTab) };
    setActiveTab(next.activeTab);
    setView(next.view);

    if (typeof window === 'undefined') return;
    const hash = encodeLocation(next);
    if (window.location.hash === hash) return;
    if (mode === 'replace') window.history.replaceState({ fedda: true }, '', hash);
    else window.history.pushState({ fedda: true }, '', hash);
  };

  const openTab = (tab: string) => {
    if (!VALID_TABS.has(tab)) return;
    navigate({ view: 'workspace', activeTab: tab });
  };

  const openHomeCard = (tab: string) => {
    if (tab === 'image') return navigate({ view: 'image-section', activeTab });
    if (tab === 'video') return navigate({ view: 'video-section', activeTab });
    return openTab(tab);
  };

  const goHome = () => navigate({ view: 'home', activeTab });

  const goBack = () => {
    if (view === 'workspace') return navigate({ view: parentViewForTab(activeTab), activeTab });
    if (view === 'image-section' || view === 'video-section') return goHome();
    return goHome();
  };

  const meta = PAGE_META[activeTab] ?? PAGE_META[DEFAULT_TAB];
  const Icon = view === 'home' ? Sparkles : view === 'image-section' ? Sparkles : view === 'video-section' ? Video : meta.Icon;
  const title = view === 'home'
    ? APP_VERSION_LABEL
    : view === 'image-section'
      ? 'Image Studio'
      : view === 'video-section'
        ? 'Video Studio'
        : meta.label;

  const renderWorkspace = () => {
    if (activeTab === 'gallery') return <GalleryPage />;
    if (activeTab === 'library') return <LibraryPage />;
    if (activeTab === 'ollama') return <OllamaModelsPage />;
    if (activeTab === 'ui-agent') return <UIAgentPage />;
    if (activeTab === 'image' || activeTab.startsWith('z-image') || activeTab.startsWith('chroma') || activeTab.startsWith('firered') || activeTab.startsWith('flux') || activeTab.startsWith('qwen')) {
      return <ImageStudioPage activeTab={activeTab} />;
    }
    return <VideoStudioPage activeTab={activeTab} />;
  };

  return (
    <div className="flex h-screen theme-bg-app text-white overflow-hidden font-sans selection:bg-white/20">
      <main className="flex-1 flex flex-col overflow-hidden theme-bg-main">
        <header className="h-14 border-b border-white/5 flex items-center px-6 shrink-0 z-10 justify-between backdrop-blur-sm bg-black/20">
          <div className="flex items-center gap-3">
            {view !== 'home' && (
              <>
                <button onClick={goBack} className="v15-home-btn inline-flex items-center gap-2" title="Back">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
                <button onClick={goHome} className="v15-home-btn" title="Back to Home">Home</button>
              </>
            )}
            <Icon className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-white tracking-tight">{title}</h2>
          </div>
          <TopSystemStrip />
        </header>

        <div className="flex-1 min-h-0 overflow-hidden">
          {view === 'home' ? (
            <RichHome onSelect={openHomeCard} />
          ) : view === 'image-section' ? (
            <ImageSectionCards onSelect={openTab} onBack={goHome} />
          ) : view === 'video-section' ? (
            <VideoSectionCards onSelect={openTab} onBack={goHome} />
          ) : (
            renderWorkspace()
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ComfyExecutionProvider>
      <ToastProvider>
        <FeddaApp />
      </ToastProvider>
    </ComfyExecutionProvider>
  );
}
