
import { GoogleGenAI, Type } from "@google/genai";

// Inicializar Lucide Icons
declare var lucide: any;
lucide.createIcons();

// Lógica de FAQ (Acordeón)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Lógica de Navegación
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar?.classList.add('pt-4');
        navbar?.classList.remove('pt-6');
    } else {
        navbar?.classList.remove('pt-4');
        navbar?.classList.add('pt-6');
    }
});

// INTEGRACIÓN GEMINI API (Nexus AI Engine)
const aiForm = document.getElementById('ai-form') as HTMLFormElement;
const generateBtn = document.getElementById('generate-btn');
const aiLoading = document.getElementById('ai-loading');
const aiResult = document.getElementById('ai-result');

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

aiForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const industry = (document.getElementById('industry') as HTMLInputElement).value;
    const goals = (document.getElementById('goals') as HTMLInputElement).value;

    if (!industry || !goals) return;

    // UI States
    aiLoading?.classList.remove('hidden');
    aiResult?.classList.add('hidden');
    if (generateBtn) (generateBtn as HTMLButtonElement).disabled = true;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Genera una estrategia de marketing digital maestra para un negocio en la industria de ${industry} con el objetivo principal de ${goals}. Responde en español y con un tono experto y audaz.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        overview: { type: Type.STRING, description: "Resumen ejecutivo de la estrategia" },
                        steps: { 
                            type: Type.ARRAY, 
                            items: { 
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    desc: { type: Type.STRING }
                                }
                            },
                            description: "3 pasos tácticos clave"
                        },
                        tips: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "3 consejos pro para este nicho"
                        }
                    },
                    required: ["overview", "steps", "tips"]
                }
            }
        });

        const data = JSON.parse(response.text || '{}');
        renderAIResult(data);

    } catch (error) {
        console.error("AI Error:", error);
        alert("Error al conectar con Nexus AI. Intenta de nuevo.");
    } finally {
        aiLoading?.classList.add('hidden');
        if (generateBtn) (generateBtn as HTMLButtonElement).disabled = false;
    }
});

function renderAIResult(data: any) {
    const overviewEl = document.getElementById('result-overview');
    const stepsEl = document.getElementById('result-steps');
    const tipsList = document.getElementById('tips-list');

    if (overviewEl) overviewEl.textContent = data.overview;
    
    if (stepsEl) {
        stepsEl.innerHTML = '';
        data.steps.forEach((step: any, idx: number) => {
            stepsEl.innerHTML += `
                <div class="bg-white/5 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                    <div class="text-6xl font-black text-blue-500/10 absolute -top-2 -right-2">0${idx + 1}</div>
                    <h5 class="font-black text-white mb-4 uppercase text-sm tracking-tight">${step.title}</h5>
                    <p class="text-xs text-slate-400 leading-relaxed font-semibold">${step.desc}</p>
                </div>
            `;
        });
    }

    if (tipsList) {
        tipsList.innerHTML = '';
        data.tips.forEach((tip: string) => {
            tipsList.innerHTML += `
                <li class="flex items-start space-x-3 text-slate-300">
                    <div class="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-2"></div>
                    <span class="text-sm font-semibold">${tip}</span>
                </li>
            `;
        });
    }

    aiResult?.classList.remove('hidden');
    aiResult?.scrollIntoView({ behavior: 'smooth' });
}
