import { pageMetadata } from '@/lib/seo';
import MerchLookbook, { ORDER_FORM_URL } from '@/components/merch/MerchLookbook';

export const metadata = pageMetadata(
  "Merch '26 | CEUS UNSW",
  "Grab the CEUS Merch '26 drop — hoodies, tees, caps and totes for the UNSW Chemical Engineering Undergraduate Society.",
  '/merch',
);

const sizeCharts = [
  {
    garment: 'Tees',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    rows: [
      { measurement: 'Body Width (cm)', values: [43, 47, 52, 56.5, 61, 64] },
      { measurement: 'Body Length (cm)', values: [68, 71, 75, 78.5, 82, 83.5] },
    ],
  },
  {
    garment: 'Hoodie',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    rows: [
      { measurement: 'Full Chest (cm)', values: [110, 115, 120, 125, 130, 135] },
      {
        measurement: 'Length — Top Shoulder Point (cm)',
        values: [66.5, 69.5, 72, 74.5, 77, 79.5],
      },
    ],
  },
];

const steps = [
  {
    title: 'Pick your items',
    body: 'Choose your garments and sizes. Check the size guide below — all measurements are flat, in centimetres.',
  },
  {
    title: 'Fill in the TryBooking form',
    body: "One form per person. You'll need a contact email, phone number and your size for each item.",
  },
  {
    title: 'Complete your order to confirm',
    body: "Complete your payment in TryBooking. Your order isn't locked in until payment clears.",
  },
  {
    title: 'Collect on campus',
    body: "Pick up your items from the CEUS common room in June Griffith (F10). We'll email you once your drop is ready.",
  },
];

export default function MerchPage() {
  return (
    <>
      <MerchLookbook />

      {/* How to order */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
          How to Order
        </h2>

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1B397E] text-xl font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-black/70">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-lg bg-[#EEF1F8] p-8 text-center md:p-12">
          <h3 className="text-2xl font-bold md:text-3xl">
            Order the merch now.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-black/70">
            List every item you want on the same form.
          </p>
          <a
            href={ORDER_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-md bg-[#1B397E] px-10 py-4 text-lg font-extrabold text-white transition-colors duration-200 hover:bg-[#14295B]"
          >
            Order merch now
          </a>
        </div>
      </section>

      {/* Size guide */}
      <section
        id="size-guide"
        className="scroll-mt-20 bg-black/5 px-4 py-16 md:px-6 md:py-24"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">
            Sizing <span className="text-[#1B397E]">(garment)</span>
          </h2>
          <p className="mb-12 text-center text-lg text-black/70">
            All measurements are of the garment itself, in centimetres. Tee
            figures are measured flat; hoodie chest is a full circumference.
          </p>

          <div className="space-y-12">
            {sizeCharts.map((chart) => (
              <div key={chart.garment}>
                <h3 className="mb-4 text-center text-2xl font-bold uppercase tracking-wide md:text-3xl">
                  {chart.garment}
                </h3>

                <div className="overflow-x-auto rounded-lg border border-black/10 bg-white shadow-2xl">
                  <table className="w-full min-w-[560px] text-left">
                    <thead className="bg-[#1B397E] text-white">
                      <tr>
                        <th className="px-6 py-4 font-extrabold">Measurement</th>
                        {chart.sizes.map((size) => (
                          <th
                            key={size}
                            className="px-4 py-4 text-center font-extrabold"
                          >
                            {size}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chart.rows.map((row) => (
                        <tr
                          key={row.measurement}
                          className="border-t border-black/10"
                        >
                          <td className="px-6 py-3 font-extrabold text-[#1B397E]">
                            {row.measurement}
                          </td>
                          {row.values.map((value, i) => (
                            <td
                              key={chart.sizes[i]}
                              className="px-4 py-3 text-center tabular-nums"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
