# BSL Form Component

A React component for creating BSL (Biosafety Level) forms using React Hook Form, Next.js, TypeScript, and shadcn/ui.

## Features

- ✅ Multiple BSL level checkboxes (1, 1P, 2, 2N, 2P, 3, 3N, 3P)
- ✅ Room specification input field
- ✅ Dynamic row addition and removal
- ✅ Form validation with Zod
- ✅ TypeScript support
- ✅ Responsive design with Tailwind CSS
- ✅ Accessible UI components from shadcn/ui

## Installation

First, install the required dependencies:

```bash
npm install react react-dom next typescript @types/react @types/react-dom @types/node
npm install react-hook-form @hookform/resolvers zod
npm install @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-slot
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install tailwindcss tailwindcss-animate autoprefixer postcss
```

## Usage

### Basic Usage

```tsx
import BSLForm, { BSLFormData } from '@/components/BSLForm';

function MyPage() {
  const handleSubmit = (data: BSLFormData) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <BSLForm onSubmit={handleSubmit} />
  );
}
```

### With Default Values

```tsx
import BSLForm, { BSLFormData } from '@/components/BSLForm';

function MyPage() {
  const defaultValues: BSLFormData = {
    rows: [
      {
        selectedLevels: ["1", "2"],
        roomSpecification: "ห้อง 101 ชั้น 1 อาคาร A",
      },
      {
        selectedLevels: ["3"],
        roomSpecification: "ห้อง 201 ชั้น 2 อาคาร B",
      },
    ],
  };

  const handleSubmit = (data: BSLFormData) => {
    console.log('Form data:', data);
  };

  return (
    <BSLForm 
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      className="max-w-4xl mx-auto"
    />
  );
}
```

## Component Props

### BSLForm Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(data: BSLFormData) => void` | Yes | Callback function called when form is submitted |
| `defaultValues` | `BSLFormData` | No | Default values for the form |
| `className` | `string` | No | Additional CSS classes |

## Data Types

### BSLFormData

```typescript
type BSLFormData = {
  rows: BSLRowData[];
}
```

### BSLRowData

```typescript
type BSLRowData = {
  selectedLevels: string[];
  roomSpecification: string;
}
```

## BSL Levels

The component supports the following BSL levels:
- `1` - BSL-1
- `1P` - BSL-1P  
- `2` - BSL-2
- `2N` - BSL-2N
- `2P` - BSL-2P
- `3` - BSL-3
- `3N` - BSL-3N
- `3P` - BSL-3P

## Features

### Dynamic Rows
- Click the "เพิ่มแถว" (Add Row) button to add new rows
- Click the trash icon to remove rows (minimum 1 row required)

### Multiple Selection
- Each row allows multiple BSL level selections
- Checkboxes can be checked/unchecked independently

### Form Validation
- At least one row is required
- Built-in validation using Zod schema
- Error messages displayed for invalid inputs

## Styling

The component uses Tailwind CSS classes and can be customized by:
1. Modifying the `className` prop
2. Updating the Tailwind configuration
3. Overriding CSS variables for shadcn/ui components

## Example Form Data Output

```json
{
  "rows": [
    {
      "selectedLevels": ["1", "2", "3"],
      "roomSpecification": "ห้อง 101 ชั้น 1 อาคาร A"
    },
    {
      "selectedLevels": ["2N", "3P"],
      "roomSpecification": "ห้อง 201 ชั้น 2 อาคาร B"
    }
  ]
}
```

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Requirements

- React 18+
- Next.js 14+
- TypeScript 5+
- Tailwind CSS 3+
- Node.js 18+