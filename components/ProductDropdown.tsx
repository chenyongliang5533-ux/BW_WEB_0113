import Link from 'next/link';

type ProductDropdownProps = {
  show: boolean;
};

export default function ProductDropdown({ show }: ProductDropdownProps) {
  if (!show) return null;

  const categoryClass =
    'flex w-full items-center justify-between px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600';
  const flyoutClass =
    'invisible absolute left-full top-0 z-10 w-44 pl-2 opacity-0 transition group-hover:visible group-hover:opacity-100';

  return (
    <div className="absolute left-0 top-full w-64 pt-2">
      <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
        <div className="group relative">
          <button type="button" className={categoryClass}>
            <span>Industrial 4G Router</span>
            <span aria-hidden="true">》</span>
          </button>
          <div className={flyoutClass}>
            <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
              <Link href="/product/bwr-352" className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                BWR_352
              </Link>
            </div>
          </div>
        </div>

        <div className="group relative">
          <button type="button" className={categoryClass}>
            <span>Industrial 4G CAT1 RTU</span>
            <span aria-hidden="true">》</span>
          </button>
          <div className={flyoutClass}>
            <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
              <Link href="/product/bwr-e01" className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                BWR_E01
              </Link>
            </div>
          </div>
        </div>

        <div className="group relative">
          <button type="button" className={categoryClass}>
            <span>Commercial 5G CPE</span>
            <span aria-hidden="true">》</span>
          </button>
          <div className={flyoutClass}>
            <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
              <Link href="/product/bwc-z1" className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                BWC_Z1
              </Link>
            </div>
          </div>
        </div>

        <Link href="/product/bw-cloud" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
          BW_Cloud
        </Link>
        <Link href="/product/vpnhub" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
          VPNHUB: WG Portal
        </Link>
        <Link href="/product/accessories" className="block rounded-b-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
          Accessories
        </Link>
      </div>
    </div>
  );
}
