import { motion } from 'framer-motion';
import { bom, categoryColor } from '../data.js';
import { EASE, Reveal, SheetHead } from './motion.jsx';

function Icon({ spec }) {
  if (spec.startsWith('fa:')) return <i className={`fas ${spec.slice(3)} w-5 text-center text-lav`} aria-hidden="true" />;
  if (spec.startsWith('fab:')) return <i className={`fab ${spec.slice(4)} w-5 text-center text-lav`} aria-hidden="true" />;
  return <img src={`Icons/${spec}`} alt="" className={`h-5 w-5 ${spec === 'github.svg' ? 'invert' : ''}`} />;
}

const categories = Object.keys(categoryColor);

export default function Stack() {
  return (
    <section id="stack" className="section bg-panel/40">
      <div className="wrap">
        <SheetHead no="04" title="Stack · Bill of materials" />
        <Reveal as="h2" className="section-title">From enterprise PLM to the modern web.</Reveal>

        {/* Legend */}
        <Reveal className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {categories.filter((c) => c !== 'Tools').map((c) => (
            <span key={c} className="label inline-flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${categoryColor[c]}`} />
              {c === 'Data' ? 'Data & tools' : c}
            </span>
          ))}
        </Reveal>

        <Reveal className="tile frame !p-0">
          <div className="overflow-x-auto">
            <table className="bom w-full text-sm min-w-[620px]">
              <caption className="sr-only">Skills and tools, with where each one was used</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-24">Find no.</th>
                  <th scope="col">Component</th>
                  <th scope="col">Category</th>
                  <th scope="col">Used in</th>
                </tr>
              </thead>
              <tbody>
                {bom.map(([no, name, icon, cat, usedIn], i) => (
                  <motion.tr
                    key={no}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                    transition={{ duration: 0.45, delay: (i % 8) * 0.04, ease: EASE }}
                  >
                    <td className="font-mono text-xs text-gray-500">{no}</td>
                    <td>
                      <span className="inline-flex items-center gap-3 text-white font-medium">
                        <Icon spec={icon} /> {name}
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-2 font-mono text-xs text-gray-400">
                        <span className={`w-2 h-2 rounded-full ${categoryColor[cat]}`} />{cat}
                      </span>
                    </td>
                    <td className="text-gray-400">{usedIn}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
