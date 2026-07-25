"use client";

import { useId } from "react";

/* ------------------------------------------------------------------ */
/* Aeronive Labs mark and lockup                                       */
/*                                                                     */
/* Vector rebuild of public/logo.jpeg, traced at source resolution:    */
/* the A-linkage, the growth curve it rides, and the gold node it      */
/* reaches for. Coordinates are the raster's own pixel space, so the   */
/* viewBox origins look arbitrary — they are not, they keep the        */
/* lockup's spacing identical to the supplied artwork.                 */
/*                                                                     */
/* Every joint has a transparent ring punched through it, so the mark  */
/* carries no background of its own and drops onto any surface.        */
/* ------------------------------------------------------------------ */

const SWOOSH =
  "M147 399.5C189.1 387.8 231.2 376.5 273.3 354.7C315.4 332.9 357.6 300.7 399.7 265.3" +
  "C441.8 229.9 483.9 191.4 526 175.3L537.5 199C495.2 216.6 452.9 255.5 410.7 290.8" +
  "C368.4 326.1 326.1 357.9 283.8 379.5C241.6 401 199.3 412.3 157 424.8Z";

const LEGS = "M215.5 423.3L371.5 146.1L527.5 423.3";

/** Collar joints: [cx, cy]. Gap radius 13, collar 22, core 9. */
const COLLARS: [number, number][] = [
  [371.5, 146.1],
  [215.5, 423.3],
  [527.5, 423.3],
];

/** Inline joints riding the legs: gap radius 12, core 8.5. */
const PIVOTS: [number, number][] = [
  [246.8, 371.2],
  [451.2, 288.1],
];

const ARC = "M399 146.5Q467.8 134.8 541.8 155.5";
const SUN: [number, number] = [572.3, 159.8];

export const MARK_VIEWBOX = "146 124 462 320";
export const LOCKUP_VIEWBOX = "146 124 1286 320";

function Mark({ maskId }: { maskId: string }) {
  return (
    <>
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="140"
          y="118"
          width="480"
          height="336"
        >
          <rect x="140" y="118" width="480" height="336" fill="#fff" />
          <g fill="#000">
            {COLLARS.map(([cx, cy]) => (
              <circle key={`g${cx}`} cx={cx} cy={cy} r="13" />
            ))}
            {PIVOTS.map(([cx, cy]) => (
              <circle key={`p${cx}`} cx={cx} cy={cy} r="12" />
            ))}
          </g>
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <path d={SWOOSH} fill="var(--logo-blue, #1a5e8b)" />
        <path
          d={LEGS}
          fill="none"
          stroke="var(--logo-green, #0e8a56)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="var(--logo-green, #0e8a56)">
          {COLLARS.map(([cx, cy]) => (
            <circle key={`c${cx}`} cx={cx} cy={cy} r="22" />
          ))}
        </g>
      </g>

      <g fill="var(--logo-green-core, #0a6c46)">
        {COLLARS.map(([cx, cy]) => (
          <circle key={`k${cx}`} cx={cx} cy={cy} r="9" />
        ))}
      </g>
      <g fill="var(--logo-blue-core, #1a5e8b)">
        {PIVOTS.map(([cx, cy]) => (
          <circle key={`v${cx}`} cx={cx} cy={cy} r="8.5" />
        ))}
      </g>

      {/* Trajectory to the gold node */}
      <path
        d={ARC}
        fill="none"
        stroke="var(--logo-gold, #e2a62b)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="0 12"
        opacity="var(--logo-arc-opacity, 0.55)"
      />
      <circle
        cx={SUN[0]}
        cy={SUN[1]}
        r="33.2"
        fill="none"
        stroke="var(--logo-gold, #e2a62b)"
        strokeWidth="2.8"
        opacity="var(--logo-ring-opacity, 0.3)"
      />
      <circle cx={SUN[0]} cy={SUN[1]} r="20.8" fill="var(--logo-gold, #e2a62b)" />
    </>
  );
}

/** The mark on its own. Ratio 462:320 — size it by height, `w-auto`. */
export function Logo({ className = "" }: { className?: string }) {
  const maskId = useId();
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      fill="none"
      role="img"
      aria-label="Aeronive Labs"
    >
      <Mark maskId={maskId} />
    </svg>
  );
}

/**
 * Full horizontal lockup, mark plus wordmark. Ratio 1286:320 — size it by
 * height, `w-auto`. The letterforms are traced outlines, not live text, so
 * the lockup never reflows or waits on a webfont.
 */
export function Wordmark({
  className = "",
  title = "Aeronive Labs",
}: {
  className?: string;
  title?: string;
}) {
  const maskId = useId();
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      className={className}
      fill="none"
      role="img"
      aria-label={title}
    >
      <Mark maskId={maskId} />
      <path fill="var(--logo-word, #1c2e42)" fillRule="evenodd" d={AERONIVE} />
      <path fill="var(--logo-labs, #0e8a56)" fillRule="evenodd" d={LABS} />
      <path fill="var(--logo-gold, #e2a62b)" d={LABS_RULE} />
    </svg>
  );
}

/* Traced letterforms — do not hand-edit; regenerate from the master raster. */

const AERONIVE =
  "M1026 185.9L1018 187.8L1011 190.7L1005 194.6L1000 199.1L995.7 204L990.7 213L988.6 220L987.6 227L987.5 231L988.7 240L991.9 249L994.6 254L996.9 257L1003 263.4L1012 269.4L1020 272.4L1024 273.3L1031 274.2L1039 274.2L1049 272.5L1055 270.5L1064 265.3L1070 260L1075.5 253L1079.3 245L1081.3 237L1081.4 224L1080.4 218L1077.4 210L1073.1 203L1067 196.5L1060 191.7L1051 187.6L1043 185.8L1035 185.3ZM730 186.5L701.4 251L699.7 254L692.5 271L691.7 272L693 272.5L712 272.3L718.8 256L720 254.1L759 254L760 255L767 272.1L768 272.5L787 272.5L787.7 272L786.2 268L780.4 255L779.6 254L777.3 248L750 187.2L749 186.4ZM805 186.6L804.7 188L804.7 272L806 272.6L871 272.5L871.4 272L871.4 258L871 256.7L827 256.6L825 256.6L824.6 256L824.6 238L825 237L864 236.9L864.5 236L864.5 233L864.5 222L864 221.5L825 221.4L824.5 220L824.6 203L825 202.4L827 202.4L869 202.4L869.7 201L869.7 187L869 186.4L868 186.4ZM896 186.5L895 187L895 189L895 272L896 272.6L914 272.6L914.7 272L915 249L916 248.6L932 248.6L933 248.7L934.1 250L947.4 269L947.7 270L950 272.6L970 272.6L970.5 272L969.4 270L954.6 249L952.3 245L957 242.3L962 238L965.2 234L968.4 227L969.4 221L969.2 212L967.5 206L964.4 200L959 194.5L955 191.7L951 189.7L944 187.6L933 186.5ZM1105 186.5L1104.5 187L1104.5 191L1104.5 272L1105 272.6L1123 272.6L1124 272.6L1124.4 272L1124.4 223L1124.5 222L1125 221.3L1167 272.5L1183 272.5L1183.4 272L1183.4 187L1182 186.5L1165 186.5L1163.5 187L1163.5 237L1163 238.1L1121 186.6ZM1212 186.6L1211.6 187L1211.6 189L1211.6 272L1212 272.5L1213 272.6L1231 272.6L1231.6 272L1231.6 271L1231.6 187L1231 186.5ZM1249 186.6L1248.6 187L1258.3 209L1259.7 213L1260.5 214L1260.6 215L1266.6 229L1267.4 230L1284.7 271L1286 272.6L1305 272.5L1307.4 268L1315.6 248L1316.5 247L1322.6 232L1323.4 231L1324.8 227L1330.3 215L1331.6 211L1332.4 210L1338.6 195L1339.4 194L1340.7 190L1342.3 187L1341 186.5L1337 186.5L1323 186.5L1322.5 187L1308.4 220L1307.6 221L1307.5 222L1301.4 236L1300.7 237L1299.4 241L1298.6 242L1297.1 246L1296 247.4L1292.4 239L1291.6 238L1290.3 234L1284.4 220L1283.6 219L1282.2 215L1270.2 187L1269 186.5ZM1360 186.4L1359.5 187L1359.5 272L1360 272.6L1362 272.6L1425 272.6L1426 272.2L1426.2 258L1426 257L1425 256.6L1380 256.6L1379.5 256L1379.5 238L1380 236.9L1418 237L1419 236.7L1419.4 235L1419.4 222L1419 221.6L1380 221.5L1379.5 221L1379.5 203L1380 202.4L1424 202.3L1424.4 201L1424.5 187L1424 186.4L1423 186.4ZM915.3 203L933 202.8L939 203.7L943.7 206L946.1 208L947.5 210L949.3 215L949.4 220L948.4 224L947.3 226L943 230.2L937 232.4L931 232.7L916 232.7L915 232.4L914.7 204ZM1028.1 203L1032 202.4L1039 202.5L1044 203.6L1048 205.5L1052.8 209L1057.3 214L1060.5 221L1061.5 226L1061.5 234L1060.5 239L1059.7 240L1059.3 242L1056.2 247L1051 252.2L1045 255.5L1042 256.5L1036 257.4L1032 257.2L1027 256.4L1024 255.4L1020 253.3L1016 250L1012.6 246L1010.7 243L1008.6 237L1007.8 230L1008.5 223L1009.6 219L1011.6 215L1014 211.6L1018 207.7L1023 204.6ZM739.7 207L740.2 207L753 238L752 238.7L727 238.7L726.4 238L726.7 237L738.7 208Z";

const LABS =
  "M929 323.8L925 324.7L923 325.5L919.2 329L917.7 332L917.7 338L919.4 341L922 343L925 344.5L934 346.8L938 348.5L939.4 350L939.4 353L937 355.5L935 356.3L931 356.4L928 356.3L924 355.2L919 352.7L916.8 357L916.8 358L921 360.4L925 361.5L932 362.2L938 361.4L942 359.5L945.2 356L946.4 353L946.4 351L946.4 349L945.1 346L943 343.7L939 341.5L927 338.3L924.6 336L924.6 333L927 330.4L930 329.6L936 329.7L942 332L943.3 331L944.5 327L943 325.9L939 324.5L935 323.7ZM704 324.5L703.4 325L703.3 326L703.3 361L704 361.8L705 361.8L729 361.8L729.5 360L729.5 357L729 356.3L710.8 356L710.1 355L710 325L709 324.5ZM782 324.5L780.6 326L779.7 328L765.1 361L766 361.8L771 361.8L772 361.2L774.6 355L776 353.5L793 353.5L794.4 354L796.8 360L798 361.7L804 361.8L804.5 361L804.3 360L803.6 359L803.4 358L788.5 325L788 324.6ZM845 324.6L844.6 325L844.5 326L844.5 359L844.6 361L845 361.7L868 361.6L872 360.5L874 359.4L876.4 357L877.3 355L877.6 352L877.4 349L876.5 347L874.9 345L871.7 343L875.4 338L875.5 332L874 329L873 327.8L870 326L865 324.7ZM851.5 331L852 330.1L853 330L861 330.1L865 330.6L867 331.5L868.4 333L868.5 337L867 339.2L865 340.2L852 340.4L851.6 340ZM784.4 333L785 332.4L786.4 335L791.4 347L791 347.9L779 348L778.3 347L779.7 343ZM851.9 346L863 345.9L868 346.8L870.3 349L870.4 353L869 355L866 356.3L852 356.4L851.6 356L851.5 353L851.5 347Z";

const LABS_RULE =
  "M702 393.9L700.8 395L700.8 399L703 399.5L951 399.5L954 399.2L954.4 397L954 394.4L953 393.8L951 393.7Z";
