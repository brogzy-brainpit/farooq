'use client';

import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import Image from 'next/image';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* ---------------- CONTEXT ---------------- */
const GridContext = createContext();

function useGridContext() {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error('useGridContext must be used within ExpandingGrids');
  }

  return context;
}

/* ---------------- GRID ---------------- */
function ExpandingGrids({
  rows = 3,
  columns = 3,
  gap = 16,
  duration = 400,
  children,
  className,
  style,
  expandRatio = 2,
}) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const cellRefs = useRef([]);

  const gridContainerStyle = useMemo(() => {
    const cols = Array(columns).fill('1fr');
    const rowsArr = Array(rows).fill('1fr');

    if (hoveredCell) {
      cols[hoveredCell.col] = `${expandRatio}fr`;
      rowsArr[hoveredCell.row] = `${expandRatio}fr`;
    }

    return {
      ...style,
      display: 'grid',
      gap: `${gap}px`,
      gridTemplateColumns: cols.join(' '),
      gridTemplateRows: rowsArr.join(' '),
      transition: `grid-template-columns ${duration}ms ease, grid-template-rows ${duration}ms ease`,
      height: '100%',
    };
  }, [hoveredCell, columns, rows, gap, duration, style, expandRatio]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!hoveredCell) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          setHoveredCell({ row: 0, col: 0 });
        }
        return;
      }

      let { row, col } = hoveredCell;

      switch (e.key) {
        case 'ArrowUp':
          row = Math.max(0, row - 1);
          break;
        case 'ArrowDown':
          row = Math.min(rows - 1, row + 1);
          break;
        case 'ArrowLeft':
          col = Math.max(0, col - 1);
          break;
        case 'ArrowRight':
          col = Math.min(columns - 1, col + 1);
          break;
        default:
          return;
      }

      e.preventDefault();
      setHoveredCell({ row, col });
    },
    [hoveredCell, rows, columns]
  );

  useEffect(() => {
    if (hoveredCell) {
      const index = hoveredCell.row * columns + hoveredCell.col;
      cellRefs.current[index]?.focus();
    }
  }, [hoveredCell, columns]);

  const contextValue = useMemo(
    () => ({
      hoveredCell,
      setHoveredCell,
      columns,
      rows,
      cellRefs,
    }),
    [hoveredCell, columns, rows]
  );

  const childrenArray = React.Children.toArray(children);

  return (
    <GridContext.Provider value={contextValue}>
      <div
        role="grid"
        aria-rowcount={rows}
        aria-colcount={columns}
        style={gridContainerStyle}
        className={className}
        onMouseLeave={() => setHoveredCell(null)}
        onKeyDown={handleKeyDown}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            role="row"
            style={{ display: 'contents' }}
          >
            {childrenArray.slice(
              rowIndex * columns,
              rowIndex * columns + columns
            )}
          </div>
        ))}
      </div>
    </GridContext.Provider>
  );
}

/* ---------------- CELL ---------------- */
const ExpandingGridCell = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { setHoveredCell, columns, cellRefs, hoveredCell } =
      useGridContext();

    const cellRef = useRef(null);

    const getCellPosition = () => {
      const cell = cellRef.current;

      if (!cell) return null;

      const rowWrapper = cell.parentNode;
      const grid = rowWrapper?.parentNode;

      if (!grid || !rowWrapper) return null;

      const rowIndex = Array.from(grid.children).indexOf(rowWrapper);
      const colIndex = Array.from(rowWrapper.children).indexOf(cell);

      return {
        row: rowIndex,
        col: colIndex,
        index: rowIndex * columns + colIndex,
      };
    };

    const handleMouseEnter = () => {
      const position = getCellPosition();

      if (position) {
        setHoveredCell({
          row: position.row,
          col: position.col,
        });
      }
    };

    const handleFocus = () => {
      const position = getCellPosition();

      if (position) {
        setHoveredCell({
          row: position.row,
          col: position.col,
        });
      }
    };

    const position = getCellPosition();

    const isFocused =
      hoveredCell && position
        ? hoveredCell.row * columns + hoveredCell.col === position.index
        : false;

    useEffect(() => {
      const position = getCellPosition();

      if (position && cellRef.current) {
        cellRefs.current[position.index] = cellRef.current;
      }
    }, [columns, cellRefs]);

    return (
      <div
        ref={(node) => {
          cellRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="gridcell"
        tabIndex={isFocused ? 0 : -1}
        className={cn(
          'grid h-full w-full place-items-center rounded-lg transition-all duration-300',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ExpandingGridCell.displayName = 'ExpandingGridCell';

/* ---------------- DEMO ---------------- */
export default function ExpandingGridsImageGalleryDemo() {
  const images = [
    { imageUrl: '/assets/red1.webp', alt: 'image 1' },
    { imageUrl: '/assets/red2.webp', alt: 'image 2' },
    { imageUrl: '/assets/red-benz.png', alt: 'image 3' },
    { imageUrl: '/assets/Sboot.jpg', alt: 'image 4' },
    { imageUrl: '/assets/STire.jpg', alt: 'image 5' },
    { imageUrl: '/assets/SWagon.jpg', alt: 'image 6' },
    { imageUrl: '/assets/yellow-car.png', alt: 'image 7' },
    { imageUrl: '/assets/exValet.jpg', alt: 'image 8' },
    { imageUrl: '/assets/red1.webp', alt: 'image 9' },
  ];

  return (
    <div className="h-[500px] w-full">
      <ExpandingGrids rows={3} columns={3}>
        {images.map((image, i) => (
          <ExpandingGridCell
            key={i}
            className="overflow-hidden rounded-lg"
          >
            <Image
              src={image.imageUrl}
              alt={image.alt}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </ExpandingGridCell>
        ))}
      </ExpandingGrids>
    </div>
  );
}