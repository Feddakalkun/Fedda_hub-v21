import { ZImageTxt2Img } from './zimage/ZImageTxt2Img';
import { FluxTxt2Img } from './flux/FluxTxt2Img';
import { ChromaSimpleTxt2Img, ChromaTxt2Img } from './chroma/ChromaTxt2Img';
import { FireRedImageEditPage } from './firered/FireRedImageEditPage';
import { QwenImageReferencePage } from './qwen/QwenImageReferencePage';
import { QwenMultiAnglesPage } from './qwen/QwenMultiAnglesPage';
import { QwenRapidEditPage } from './qwen/QwenRapidEditPage';
import { ZImageDualLoraPage } from './zimage/ZImageDualLoraPage';

interface ImageStudioPageProps {
  activeTab?: string;
}

export const ImageStudioPage = ({ activeTab = 'z-image-txt2img' }: ImageStudioPageProps) => {
  if (activeTab === 'z-image-dual-lora') return <ZImageDualLoraPage />;
  if (activeTab === 'firered-image-edit') return <FireRedImageEditPage />;
  if (activeTab === 'chroma-simple-txt2img') return <ChromaSimpleTxt2Img />;
  if (activeTab === 'chroma' || activeTab === 'chroma-txt2img') return <ChromaTxt2Img />;
  if (activeTab === 'flux' || activeTab === 'flux-txt2img') return <FluxTxt2Img />;
  if (activeTab === 'qwen-rapid-edit-v23') return <QwenRapidEditPage />;
  if (activeTab === 'qwen' || activeTab === 'qwen-txt2img') return <QwenImageReferencePage />;
  if (activeTab === 'qwen-image-ref') return <QwenImageReferencePage />;
  if (activeTab === 'qwen-multi-angle') return <QwenMultiAnglesPage />;
  return <ZImageTxt2Img />;
};
