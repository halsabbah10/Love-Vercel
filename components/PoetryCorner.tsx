"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';

interface Poetry {
  id: string;
  author: string;
  content: string;
  translation?: string;
}

const poems: Poetry[] = [
  {
    id: "merah-1",
    author: "ميره",
    content: `النهاية؟ أم أنها بداية كل شيء؟
بكفيني، في عتمة الطريق، أن أرى طيفك يلاحقني.
أتعلم يا ألطف من عرفت؟ ويا أحنَّ من قابلت؟
ويا أقربَ الناس، وأعزَّ العابرين في أيامي؟
أتعلم؟
أنني أرتمي إليك في كل مرةٍ يأكلني بها الحزن، أهرب إلى طريق نهايته أنت، حتى وإن لم أبُح، وإن لم يكن لساني قادرًا على الحديث.
مُغرمةٌ بك، بكل تفاصيلك، ومنذ اللقاء الأول كنتَ ولا زلتَ فارسَ أحلامي، الذي لطالما دعوتُ اللّٰه قربه.
أحببتك سرًّا، وكان اللّٰه وحده من يعلم قدرك في قلبي.
أحببتك، وكنت أول حبِّ في حياتي.
كيف لي أن لا أعشقك، وأنت مهربي الوحيد من وحشة الحياة؟
ها أنا أعود مجددًا لملجئي الوحيد، ومهربي الأقرب الكتابة.`
  },
  {
    id: "merah-2",
    author: "ميره",
    content: `ولأنني أعود محمّلة بثِقل الأيام، ولا أجد ملجأً لضجيج قلبي سوى الكتابة، سأكتب… سأكتب شعوري فقط.

كنتُ ولا زلتَ أعظم صُدف أيامي… فارس قلبي، وأكثر الرجال هيبةً في عيني.
أعتذر لنفسي عن كل تلك الأيام التي مرّت بعيدةً عنك.
أنظر إلى مرآتي، ملامحي الدافئة، شفتان مورّدتان، عيونٌ بنية، وشعرٌ بنيّ طويل.
أرى نفسي أجمل نساء الأرض، وأكثرهنّ حظًا.
أراك في عيني، في ابتسامتي ونجاحي.
يا هُمامَ الرجال، كيف أغويتني؟
أغار عليك إلى حدّ الجنون، إلى حدّ القتل أو ما شابهه.
أحبك يا راحتي، ويا نعيمي، يا أماني ومسكني…`
  },
  {
    id: "husam-1",
    author: "حسام",
    content: `يا ميره…
ما كتبته ليس رسالة، بل سُقيا روح، ورعشة شوق، ونبض امرأةٍ خُلقت لي.
أنا لا أبحث عن الجمال، لأنه اختاركِ واكتفى…
ولا أطلب العشق، لأنكِ وحدكِ جعلتِه دينًا من اللذة لا يُكفَر به.

حين تناديني، تنطفئ ضوضاء الكون، ويشتعل صدري بالسكينة.
أراكِ… فتزهر الأرض تحت قدميكِ،
ويخجل الغيم من بياضكِ، ويتلعثم الشعر بين شفتيكِ.
في وجهكِ دفءُ العمر، وفي عينيكِ أنوثةٌ تُغرقني بلا رحمة.

أغارُ عليكِ من عطركِ، من شعركِ، من أنفاسكِ…
وأشتهي الحديث معكِ كما يشتهي العاشق لمسة الخلود.
كل تفصيلةٍ فيكِ فتنة:
خدّاكِ… وطنٌ للقبلات،
وصوتكِ… موسيقى لا تُعزف إلا لقلبي،
وشفاهكِ… وعدٌ بحياةٍ لا تشبه سواكِ.

أحبكِ، لا بعقل الرجال… بل بجنون من عرفكِ، ولم يرد النجاة بعدها.
يا ميره، أنتِ أنثى لا تُكرّر، وامرأةٌ تُكتبُ فيها القصائد وتضيع بعدها اللغة.

قولي ما شئتِ… لكن اعلمي أني رجل لا يُجيد التمثيل،
وما قلته الآن؟
ليس غزلاً…
بل اعتراف عاشقٍ لا يملك من العالم إلاكِ.`
  }
];

export const PoetryCorner = () => {
  const [selectedPoem, setSelectedPoem] = useState<Poetry | null>(null);
  const [isArabic, setIsArabic] = useState(true);

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="title-large text-primary">
            {isArabic ? "ركن الشعر" : "Poetry Corner"}
          </h2>
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="font-pixel bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
          >
            {isArabic ? "English" : "العربية"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {poems.map((poem) => (
            <motion.div
              key={poem.id}
              className="bg-card rounded-lg p-6 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPoem(poem)}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-script text-lg">
                  {poem.author}
                </span>
              </div>
              <p className="font-arabic text-right leading-relaxed line-clamp-4">
                {poem.content.split('\n').slice(0, 2).join('\n')}...
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPoem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPoem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card max-w-2xl w-full rounded-lg p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPoem(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-accent" />
                  <h3 className="font-script text-2xl">{selectedPoem.author}</h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="font-arabic text-right leading-relaxed whitespace-pre-line">
                    {selectedPoem.content}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};