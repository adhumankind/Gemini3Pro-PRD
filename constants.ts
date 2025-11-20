import { AIFeature } from './types';
import { Sparkles, Briefcase, Zap } from 'lucide-react';

export const AI_FEATURES: AIFeature[] = [
  {
    id: 'nano_banana',
    title: '智能修图 (Nano Banana)',
    description: '强大的照片编辑能力。添加物体、移除背景、修改风格。',
    iconName: 'Wand2',
    category: 'vision'
  },
  {
    id: 'conversational_voice',
    title: '语音对话 (Conversational Voice)',
    description: '使用 Gemini Live API 构建实时语音交互体验。',
    iconName: 'AudioWaveform',
    category: 'audio'
  },
  {
    id: 'veo_animate',
    title: '图像转视频 (Animate with Veo)',
    description: '让静态图片动起来。制作视频广告或动态人像。',
    iconName: 'Clapperboard',
    category: 'video'
  },
  {
    id: 'google_search',
    title: '谷歌搜索 (Google Search)',
    description: '实时搜索结果。引用新闻、时事、事实核查。',
    iconName: 'Search',
    category: 'data'
  },
  {
    id: 'google_maps',
    title: '地图数据 (Google Maps)',
    description: '实时地图数据。获取地点、路线、导航信息。',
    iconName: 'MapPin',
    category: 'data'
  },
  {
    id: 'imagen_generate',
    title: '文生图 (Generate Images)',
    description: '通过文本生成高质量图片。概念图、博客配图、素材。',
    iconName: 'Image',
    category: 'vision'
  },
  {
    id: 'gemini_intelligence',
    title: '通用智能 (Gemini Intelligence)',
    description: '嵌入 Gemini 分析内容、编辑文本、处理复杂任务。',
    iconName: 'Sparkles',
    category: 'logic'
  },
  {
    id: 'chatbot',
    title: 'AI 聊天机器人 (Chatbot)',
    description: '上下文感知的客服代理，记忆对话，处理多步任务。',
    iconName: 'MessageSquareText',
    category: 'logic'
  },
  {
    id: 'video_prompt',
    title: '文生视频 (Video Generation)',
    description: '将脚本或描述转化为短视频片段。',
    iconName: 'Film',
    category: 'video'
  },
  {
    id: 'aspect_ratios',
    title: '画幅控制 (Aspect Ratios)',
    description: '控制生成图片的比例。适配手机壁纸或横幅。',
    iconName: 'Crop',
    category: 'vision'
  },
  {
    id: 'analyze_images',
    title: '图像分析 (Analyze Images)',
    description: '识别收据、菜单、图表。提取数据、翻译、总结。',
    iconName: 'ScanEye',
    category: 'vision'
  },
  {
    id: 'flash_lite',
    title: '极速响应 (Fast Responses)',
    description: '使用 2.5 Flash-Lite 实现闪电般的实时响应。',
    iconName: 'Zap',
    category: 'logic'
  },
  {
    id: 'video_understanding',
    title: '视频理解 (Video Understanding)',
    description: '分析视频内容，生成摘要、精彩片段、营销亮点。',
    iconName: 'PlaySquare',
    category: 'video'
  },
  {
    id: 'transcribe_audio',
    title: '音频转录 (Transcribe Audio)',
    description: '对任何音频流进行实时、准确的转录。',
    iconName: 'FileText',
    category: 'audio'
  },
  {
    id: 'thinking_mode',
    title: '深度思考 (Thinking Mode)',
    description: '给 AI 思考时间，处理最复杂的用户查询。',
    iconName: 'BrainCircuit',
    category: 'logic'
  },
  {
    id: 'generate_speech',
    title: '语音合成 (Generate Speech)',
    description: '文本转语音朗读文章、音频导航、语音助手。',
    iconName: 'Mic',
    category: 'audio'
  }
];

export const APP_MODES = [
  { 
    id: 'playful', 
    label: '有趣 (Playful)', 
    desc: '注重游戏化、音效反馈和高互动性。适合 C 端娱乐产品。',
    icon: Sparkles,
    color: 'text-pink-400',
    borderColor: 'hover:border-pink-500',
    bg: 'hover:bg-pink-500/10'
  },
  { 
    id: 'professional', 
    label: '专业 (Professional)', 
    desc: '注重效率、稳健性、数据准确和清晰的层级。适合 B 端或工具产品。',
    icon: Briefcase,
    color: 'text-blue-400',
    borderColor: 'hover:border-blue-500',
    bg: 'hover:bg-blue-500/10'
  },
  { 
    id: 'experimental', 
    label: '灵光一闪 (Experimental)', 
    desc: '探索新颖交互、打破常规、追求“Wow”时刻。适合 MVP 或艺术项目。',
    icon: Zap,
    color: 'text-yellow-400',
    borderColor: 'hover:border-yellow-500',
    bg: 'hover:bg-yellow-500/10'
  },
];

export const STYLE_OPTIONS = [
  { id: 'minimalist', label: '极简 (Minimalist)', desc: 'Apple 风格，留白' },
  { id: 'cyberpunk', label: '赛博 (Cyberpunk)', desc: '高对比，霓虹' },
  { id: 'glassmorphism', label: '毛玻璃 (Glass)', desc: '模糊，通透' },
  { id: 'custom', label: '标准 (Default)', desc: '清晰 UI' },
];

export const APP_IDEAS_POOL = [
  { label: "🏋️ 健身纠正", prompt: "做一个健身 App，用视频分析我的深蹲动作是否标准。" },
  { label: "📸 AI 滤镜", prompt: "我想做一个类似 Instagram 的应用，但所有滤镜都是用 AI 生成的。" },
  { label: "🗣️ 少儿语伴", prompt: "帮我设计一个少儿英语学习 App，要有可爱的语音对话伙伴。" },
  { label: "🍳 冰箱大厨", prompt: "拍照识别冰箱里的食材，然后生成食谱并教我做菜。" },
  { label: "🎵 哼唱成曲", prompt: "录一段我的哼唱，自动变成完整的交响乐或流行歌。" },
  { label: "🗺️ 历史导游", prompt: "基于地图，当我走到古迹时，用 AR 和语音讲它的历史故事。" },
  { label: "📰 智能新闻", prompt: "每天帮我从 Google 搜索汇总科技新闻，并用播音员的声音读给我听。" },
  { label: "👗 虚拟试衣", prompt: "上传我的全身照，帮我试穿各种网购的衣服。" },
  { label: "🐾 宠物翻译", prompt: "录下猫狗的叫声，分析它们的情绪并翻译成人话。" },
  { label: "📝 会议纪要", prompt: "实时转录会议录音，并自动提取待办事项和摘要。" },
  { label: "🎨 梦境画板", prompt: "我描述一个梦境，APP 自动生成一系列连环画。" },
  { label: "🎬 自动剪辑", prompt: "上传一小时的家庭录像，自动剪辑成 30 秒的精彩配乐短片。" },
  { label: "📊 财报分析", prompt: "上传复杂的财务报表截图，AI 帮我分析关键数据风险。" },
  { label: "🧘 冥想生成", prompt: "根据我现在的心情和环境噪音，实时生成引导冥想词和背景音。" },
  { label: "🪴 植物医生", prompt: "拍一下枯萎的植物，告诉我它得了什么病以及怎么救。" },
  { label: "🏠 装修预览", prompt: "拍一下毛坯房，实时渲染出北欧风装修后的样子。" },
  { label: "📚 互动小说", prompt: "一个文字冒险游戏，剧情和结局完全由 AI 实时生成。" },
  { label: "🎤 模拟面试", prompt: "模拟大厂面试官，通过语音对我进行压力面试并打分。" },
  { label: "🍷 选酒助手", prompt: "拍一下酒标，告诉我它的评分、口感和搭配什么菜。" },
  { label: "🚗 路况预警", prompt: "结合地图数据，预测未来一小时的路况变化。" },
  { label: "🎁 礼物推荐", prompt: "描述朋友的性格和爱好，推荐 5 个绝佳的礼物方案。" },
  { label: "👴 记忆胶囊", prompt: "帮助阿尔茨海默症老人识别亲人照片，并语音提醒这是谁。" },
  { label: "✍️ 笔迹鉴定", prompt: "分析手写笔记的字迹，判断书写者的性格特征（娱乐向）。" },
  { label: "🎥 电影百科", prompt: "拍一张电影海报，告诉我演员表、评分和哪里可以看。" },
  { label: "🎼 乐谱转换", prompt: "听一段钢琴曲，自动生成五线谱 PDF。" },
  { label: "🐦 鸟类图鉴", prompt: "录制鸟叫声，识别是哪种鸟并显示它的照片。" },
  { label: "💹 股市情绪", prompt: "搜索最新的财经新闻，分析市场对某只股票的情绪倾向。" },
  { label: "🧩 乐高识别", prompt: "拍一堆散乱的乐高积木，推荐能拼成什么模型。" },
  { label: "💊 药盒提醒", prompt: "拍一下药盒说明书，自动设置服药提醒闹钟。" },
  { label: "🌈 色彩提取", prompt: "从风景照中提取配色方案，供设计师使用。" },
  { label: "🔮 星座运势", prompt: "结合实时星图数据，生成我今天的个性化运势解读。" },
  { label: "📜 古诗作画", prompt: "输入一句古诗词，生成符合意境的水墨画风格图片。" },
  { label: "🔨 代码重构", prompt: "上传一段屎山代码，AI 帮我重构并解释优化思路。" },
  { label: "⚖️ 法律顾问", prompt: "基于当地法律条款，回答我的日常法律纠纷问题。" },
  { label: "✈️ 旅行规划", prompt: "根据我的预算和假期天数，生成一份详细的全球旅行计划。" },
  { label: "🔥 卡路里", prompt: "拍一下我的午餐，计算卡路里并给出营养建议。" },
  { label: "🎧 情绪歌单", prompt: "扫描我的面部表情，推荐符合当前心情的 Spotify 歌单。" },
  { label: "🗣️ 方言翻译", prompt: "将粤语或四川话的语音实时翻译成标准普通话字幕。" },
  { label: "🖼️ 老照片修复", prompt: "上传一张模糊的黑白老照片，自动上色并提升清晰度。" },
  { label: "🤟 手语识别", prompt: "通过摄像头识别手语手势，并实时转化为文字语音。" },
  { label: "📄 简历优化", prompt: "上传我的简历 PDF，针对特定职位描述给出修改建议。" },
  { label: "🏗️ 像素建筑", prompt: "上传一张建筑照片，生成 Minecraft 中的建造蓝图。" },
  { label: "🗣️ 辩论教练", prompt: "设定一个辩题，AI 扮演反方与我进行高强度辩论练习。" },
  { label: "📖 绘本生成", prompt: "为我的孩子生成一个以他为主角的睡前故事绘本。" },
  { label: "🔍 谣言粉碎", prompt: "输入一条朋友圈传闻，快速搜索并验证其真实性。" }
];