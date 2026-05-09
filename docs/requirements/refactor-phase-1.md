# Refactor code Phase 1

## 1. Tổng quan

- Task này mình sẽ đi refactor lại code của phase 1, vì code chưa được clean và chưa bám theo convention code hiện tại

## 2. Chi tiết refactor

# A. Refactor chi tiết việc call api ở các component:

- Hạn chế dùng useEffect để request API, chỉ dùng useEffect để xử lý cái events hay các update của components
- Sử dụng tanstack query để query api / mutate api và sử dụng http-instance thay vì dùng fetch trong useEffect như hiện tại.
- Tôi đã setup sẵn 2 cái base example trong folder api/auth/index.ts và api/transactions/index.ts. Mình sẽ build các api khác tương đương cho các module như admin, products, bookings, ... dựa trên 2 base example trên. riêng cái auth mình có thể remove đi những cái dư thừa và chỉ giữ lại những cái cần. transactions thì nó là base thôi.
- Cách sử dụng chi tiết:

1. Cách dùng các custom hooks trong file queries.ts

===== query ======

##

export const usePayoutsContainer = () => {
const { t } = useTranslation('transactions-page');
const search = Route.useSearch();
const navigate = Route.useNavigate();

const filters = {
page: search.page,
pageSize: search.pageSize,
sortBy: search.sortBy,
orderBy: search.orderBy,
search: search.search,
type: ['PAYOUT'],
status: filterBooleanArray(search.status),
chain: filterBooleanArray(search.chain),
crypto: filterBooleanArray(search.crypto),
network: filterBooleanArray(search.network),
fromDate: search.fromDate,
toDate: search.toDate,
};

const { data, isFetching, isLoading, refetch } = useGetTransactionList(filters, {
refetchInterval: BASE_REFRESH_INTERVAL,
placeholderData: (prev) => prev,
});

const onPaginationChange = (page: number, pageSize: number, action: 'pagination' | 'limiting') => {
navigate({
search: {
...search,
page: action === 'pagination' ? page : 1,
pageSize: pageSize,
},
replace: true,
});
};

const onSortingChange = (updatedSorting: SortingState) => {
if (updatedSorting.length > 0) {
navigate({
search: {
...search,
sortBy: updatedSorting[0].id,
orderBy: updatedSorting[0].desc ? 'desc' : 'asc',
},
replace: true,
});
} else {
navigate({
search: {
...search,
orderBy: 'desc',
sortBy: 'updatedAt',
},
replace: true,
});
}
};

const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, row: ITransaction) => {
e.preventDefault();
navigate({
to: ROUTES.TRANSACTION_DETAIL,
params: {
transactionId: row.id.toString(),
},
});
};

const tableData = useMemo(() => {
return {
data: data?.data ?? [],
pagination: {
pageIndex: data?.pagination.page ?? 1,
pageSize: data?.pagination.pageSize ?? PAGE_SIZE_OPTIONS[0],
pageCount: data?.pagination.totalPages ?? 0,
hasNext: data?.pagination.hasNext ?? false,
hasPrev: data?.pagination.hasPrev ?? false,
},
};
}, [data]);

return {
t,
isLoading,
isFetching,
tableData,
onPaginationChange,
onSortingChange,
onRowClick,
refetch,
};
};

## Mutation

export const useMutationContainer = () => {
const loginMutation = useLoginMutation();
const onLogin = async (body) => {
try {
await loginMutation.mutateAsync(body);
toast.success('Login success');
} catch (error) {

        }
    }

return {
onLogin,
isPending: loginMutation.isPending
};
};

## B. Refactor việc chứa các state lúc call API:

- Ko dùng local state để lưu các params mà thay vào đó sử dụng thư viện nuqs -> sử dụng nuqs để lấy các params trên url và dùng nó là query để truyền vào các hook useQuery mà mình đã viết trong folder API.
- Ví dụ cách sử dụng nuqs:

##

const [query] = useQueryStates({
[PAGE_KEY]: parseAsInteger.withDefault(1),
[PER_PAGE_KEY]: parseAsInteger.withDefault(10),
[SORT_KEY]: parseAsString.withDefault(""),
search: parseAsString.withDefault(""),
types: parseAsString.withDefault(""),
status: parseAsString.withDefault(""),
isFeatured: parseAsString.withDefault("true"),
});

const { data, isLoading } = useGetProductList(
{ ...query },
{
placeholderData: (prev) => prev,
}
);

##

## C. Refactor việc render table cho các trang product list, categories list, ... etc:

- Không tự code chay table, sử dụng data-table.tsx mà tôi đã build trước để render ( @ src/components/ui/data-table/data-table.tsx) :
- Ví dụ:

## Chi tiết việc hiển thị table với data-table ( bản dưới đây là dùng react vite, mình sẽ chỉ dựa trên example và mình sẽ làm lại thành nextjs, ví dụ như những cái tanstack-router thì mình sẽ dùng router của nextjs, vì nextjs ko có tanstack-router)

file: create-column.tsx

import type { ITransaction } from '@/apis/transactions';
import { Badge } from '@/components/ui/badge';
import CopyButton from '@/components/ui/copy-button';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import TruncateParagraph from '@/components/ui/truncate-paragraph';
import { capitalizeFirstLetter, formatAddress, formatDate, formatNaturalNumber } from '@/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { TFunction } from 'i18next';

interface TransactionColumnsProps {
t: TFunction;
}

export const getTypeDisplay = (type: string, t: TFunction): string => {
if (type === 'PAYMENT') return t('types.PAYMENT');
if (type === 'PAYOUT') return t('types.PAYOUT');
return capitalizeFirstLetter(type);
};

export const getStatusText = (status: string, t: TFunction): string => {
return t(`status.${status}`);
};

export const getStatusVariant = (status: string): 'pending' | 'confirming' | 'confirmed' | 'failed' | 'default' => {
if (status === 'confirmed') return 'confirmed';
if (status === 'pending' || status === 'confirming') return 'pending';
if (status === 'failed') return 'failed';
return 'default';
};

export const createColumns = ({ t }: TransactionColumnsProps): ColumnDef<ITransaction>[] => [
{
accessorKey: 'id',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.id')} />,
cell: ({ row }) => {
const \_row = row.original;
return <div className='font-medium'>{\_row.id}</div>;
},
enableSorting: false,
},
{
accessorKey: 'type',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.type')} />,
cell: ({ row }) => {
const \_row = row.original;
return <div className='font-medium'>{getTypeDisplay(\_row.type, t)}</div>;
},
enableSorting: false,
},
{
accessorKey: 'relatedType',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.relatedType')} />,
cell: ({ row }) => {
const \_row = row.original;
return <div className='font-medium'>{\_row.relatedType}</div>;
},
enableSorting: false,
},
{
accessorKey: 'status',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.status')} />,
cell: ({ row }) => {
const \_row = row.original;
const status = \_row.status.toLocaleLowerCase();
return <Badge variant={getStatusVariant(status)}>{getStatusText(status, t)}</Badge>;
},
enableSorting: false,
},
{
accessorKey: 'chain',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.chain')} />,
cell: ({ row }) => {
const \_row = row.original;
return <div className='font-medium'>{\_row.chain}</div>;
},
enableSorting: false,
},
{
accessorKey: 'network',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.network')} />,
cell: ({ row }) => {
const \_row = row.original;
return <div className='font-medium'>{\_row.network}</div>;
},
enableSorting: false,
},
{
accessorKey: 'amount',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.amount')} />,
cell: ({ row }) => {
const \_row = row.original;
const amount = formatNaturalNumber(Number(\_row.amount ?? 0), {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
});
return (

<div className='font-medium'>
{amount} {_row.crypto}
</div>
);
},
},
{
accessorKey: 'crypto',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.crypto')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{_row.crypto}</div>;
},
enableSorting: false,
},
{
accessorKey: 'blockNumber',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.blockNumber')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{formatNaturalNumber(_row.blockNumber)}</div>;
},
enableSorting: false,
},
{
accessorKey: 'confirmations',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.confirmations')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{_row.confirmations}</div>;
},
},
{
accessorKey: 'txHash',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.txHash')} />,
cell: ({ row }) => {
const _row = row.original;
return (
<div className='flex items-center gap-1'>
<TruncateParagraph truncatedContent={formatAddress(_row.txHash)} fullContent={_row.txHash} />
<CopyButton value={_row.txHash} className='border-none bg-transparent! shadow-none!' />
</div>
);
},
enableSorting: false,
},
{
accessorKey: 'toAddress',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.toAddress')} />,
cell: ({ row }) => {
const _row = row.original;
return (
<div className='flex items-center gap-1'>
<TruncateParagraph truncatedContent={formatAddress(_row.toAddress)} fullContent={_row.toAddress} />
<CopyButton value={_row.toAddress} className='border-none bg-transparent! shadow-none!' />
</div>
);
},
enableSorting: false,
},
{
accessorKey: 'blockTimestamp',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.blockTimestamp')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{formatDate(_row.blockTimestamp)}</div>;
},
enableSorting: false,
},
{
accessorKey: 'confirmedAt',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.date')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{formatDate(_row.confirmedAt)}</div>;
},
enableSorting: false,
},
{
accessorKey: 'createdAt',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.createdAt')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{formatDate(_row.createdAt)}</div>;
},
enableSorting: false,
},
{
accessorKey: 'updatedAt',
header: ({ column }) => <DataTableColumnHeader column={column} title={t('table.headers.updatedAt')} />,
cell: ({ row }) => {
const _row = row.original;
return <div className='font-medium'>{formatDate(_row.updatedAt)}</div>;
},
enableSorting: false,
},
];

file table-container.tsx:

import type { ITransaction } from '@/apis/transactions';
import { DataTable } from '@/components/ui/data-table';
import { useTranslation } from '@/integrations/i18n';
import type { SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';
import TableFilterContainer from '../table-filter-container';
import { createColumns } from './create-columns';

export type TransactionTableContainerProps = {
onPaginationChange?: (page: number, pageSize: number, action: 'pagination' | 'limiting') => void;
onSortingChange: (updatedSorting: SortingState) => void;
onRowClick?: (e: React.MouseEvent<HTMLTableRowElement>, row: ITransaction) => void;
isLoading: boolean;
isFetching: boolean;
tableData: {
data: ITransaction[];
pagination: {
pageIndex: number;
pageSize: number;
pageCount: number;
hasNext: boolean;
hasPrev: boolean;
};
};
searchValue?: string;
};

const TransactionTableContainer = ({
isLoading,
isFetching,
tableData,
onPaginationChange,
onSortingChange,
onRowClick,
}: TransactionTableContainerProps) => {
const { t } = useTranslation('transactions-page');
const columns = useMemo(() => createColumns({ t }), [t]);

return (
<DataTable
      columns={columns}
      data={tableData.data}
      pagination={tableData.pagination}
      isInitialLoading={isLoading}
      isDataFetching={isFetching}
      onPaginationChange={onPaginationChange}
      onSortingChange={onSortingChange}
      onRowClick={onRowClick}
    >
<TableFilterContainer />
</DataTable>
);
};

export default TransactionTableContainer;

File hook.ts:

import { useGetTransactionList, type ITransaction } from '@/apis/transactions';
import { BASE_REFRESH_INTERVAL, PAGE_SIZE_OPTIONS, ROUTES } from '@/constant';
import { useTranslation } from '@/integrations/i18n';
import { Route } from '@/routes/(private)/transactions';
import { filterBooleanArray } from '@/utils';
import type { SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';

export const usePaymentsContainer = () => {
const { t } = useTranslation('transactions-page');
const search = Route.useSearch();
const navigate = Route.useNavigate();

const filters = {
page: search.page,
pageSize: search.pageSize,
sortBy: search.sortBy,
orderBy: search.orderBy,
search: search.search,
type: ['PAYMENT'],
status: filterBooleanArray(search.status),
chain: filterBooleanArray(search.chain),
crypto: filterBooleanArray(search.crypto),
network: filterBooleanArray(search.network),
fromDate: search.fromDate,
toDate: search.toDate,
};

const { data, isFetching, isLoading, refetch } = useGetTransactionList(filters, {
refetchInterval: BASE_REFRESH_INTERVAL,
placeholderData: (prev) => prev,
});

const onPaginationChange = (page: number, pageSize: number, action: 'pagination' | 'limiting') => {
navigate({
search: {
...search,
page: action === 'pagination' ? page : 1,
pageSize: pageSize,
},
replace: true,
});
};

const onSortingChange = (updatedSorting: SortingState) => {
if (updatedSorting.length > 0) {
navigate({
search: {
...search,
sortBy: updatedSorting[0].id,
orderBy: updatedSorting[0].desc ? 'desc' : 'asc',
},
replace: true,
});
} else {
navigate({
search: {
...search,
orderBy: 'desc',
sortBy: 'updatedAt',
},
replace: true,
});
}
};

const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, row: ITransaction) => {
e.preventDefault();
navigate({
to: ROUTES.TRANSACTION_DETAIL,
params: {
transactionId: row.id.toString(),
},
});
};

const tableData = useMemo(() => {
return {
data: data?.data ?? [],
pagination: {
pageIndex: data?.pagination.page ?? 1,
pageSize: data?.pagination.pageSize ?? PAGE_SIZE_OPTIONS[0],
pageCount: data?.pagination.totalPages ?? 0,
hasNext: data?.pagination.hasNext ?? false,
hasPrev: data?.pagination.hasPrev ?? false,
},
};
}, [data]);

return {
t,
isLoading,
isFetching,
tableData,
onPaginationChange,
onSortingChange,
onRowClick,
refetch,
};
};

##

# C. Refactor các trang create / edit mà có chứa images như products,... etc:

- Những trang có chứa tạo / edit mà có images trong schema như products, phải làm các form cho nó đầy đủ field chứ k phải chỉ 3-4 fields. tôi muốn phải đầy đủ giống như dưới đây

- Ví dụ trang product create / edit:

#

- schema/product.ts

import { IMedia } from "@/types";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
"image/jpeg",
"image/jpg",
"image/png",
"image/webp",
];

export const productFormSchema = z.object({
imageUrl: z
.array(z.custom<IMedia>())
.min(1, "Image is required.")
.refine(
(medias) => medias.every((m) => !m.file || m.file.size <= MAX_FILE_SIZE),
"Each file must be 5MB or less"
)
.refine(
(medias) =>
medias.every(
(m) => !m.file || ACCEPTED_IMAGE_TYPES.includes(m.file.type)
),
"Invalid file type"
),
images: z
.array(z.custom<IMedia>())
.max(4, "Maximum 4 images allowed.")
.refine(
(medias) => medias.every((m) => !m.file || m.file.size <= MAX_FILE_SIZE),
"Each file must be 5MB or less"
)
.refine(
(medias) =>
medias.every(
(m) => !m.file || ACCEPTED_IMAGE_TYPES.includes(m.file.type)
),
"Invalid file type"
)
.optional(),
name: z.string().min(3, "Product name must be at least 3 characters"),
description: z.string().min(20, "Description must be at least 20 characters"),
price: z.number().min(1, "Price must be at least $1"),
  salePrice: z.number().min(1, "Sale price must be at least $1").optional(),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  type: z.string(),
  status: z.enum(["active", "inactive"]),
  categoryId: z.string().min(1, "Category is required"),
  stockQuantity: z.number().min(1, "Stock quantity must be at least 1"),
  unit: z.string().min(2, "Unit must be at least 2 characters"),
  weight: z.number().min(0.1, "Weight must be at least 0.1").optional(),
  length: z.number().min(0.1, "Length must be at least 0.1").optional(),
  width: z.number().min(0.1, "Width must be at least 0.1").optional(),
  height: z.number().min(0.1, "Height must be at least 0.1").optional(),
  material: z.string().min(2, "Material must be at least 2 characters"),
  finish: z.string().min(2, "Finish must be at least 2 characters"),
  color: z.string().min(2, "Color must be at least 2 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
"Slug must contain only lowercase letters, numbers, and hyphens (-)"
),
metaTitle: z.string().min(10, "Meta title must be at least 10 characters"),
metaDescription: z
.string()
.min(20, "Meta description must be at least 20 characters"),
keywords: z.array(z.string()),
sortOrder: z.number(),
isFeatured: z.boolean(),
});

export type CreateProductFormData = z.infer<typeof productFormSchema>;

export const defaultValues = {
imageUrl: [],
images: [],
name: "",
description: "",
price: 0,
salePrice: 0,
sku: "",
type: "" as const,
status: "active" as const,
categoryId: "",
stockQuantity: 0,
unit: "",
weight: 0,
length: 0,
width: 0,
height: 0,
material: "",
finish: "",
color: "",
slug: "",
metaTitle: "",
metaDescription: "",
keywords: [],
sortOrder: 0,
isFeatured: false,
};

- hook create.ts:

"use client";

import { useGetCategoryTree } from "@/apis/categories";
import {
CreateProductRequest,
KEYS,
useCreateProductMutation,
} from "@/apis/products";
import { useUploadFileMutation } from "@/apis/uploads";
import { queryClient } from "@/components/providers/QueryClientProvider";
import { IMedia } from "@/types";
import { handleToastError } from "@/utils/common";
import { ROUTES } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import \_ from "lodash";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
CreateProductFormData,
defaultValues,
productFormSchema,
} from "./validation";

export const useCreateProductForm = () => {
const router = useRouter();

/\*_ Queries and mutations _/
const { data } = useGetCategoryTree();
const addProductMutation = useCreateProductMutation();
const uploadFileMutation = useUploadFileMutation();

/\*_ Memorized values _/
const isPending =
addProductMutation.isPending || uploadFileMutation.isPending;

const formMethods = useForm<CreateProductFormData>({
resolver: zodResolver(productFormSchema),
defaultValues: defaultValues,
mode: "onChange",
});

const categoryOptions = useMemo(() => {
if (!data || data.length === 0) return [];
return data?.map((category) => ({
value: category.id,
label: category.name,
disabled: false,
}));
}, [data]);

const memorizedCategories = useMemo(() => {
if (!data || data.length === 0) {
return {
categoryOptions: [],
groupCategoryById: {},
};
}

    const categoryOptions = data?.map((category) => ({
      value: category.id,
      label: category.name,
      disabled: false,
    }));
    const groupCategoryById = _.mapValues(_.keyBy(data, "id"), "slug");
    return {
      categoryOptions,
      groupCategoryById,
    };

}, [data]);

const uploadImage = async (image: File) => {
try {
const res = await uploadFileMutation.mutateAsync({ file: image });
return res.file.id;
} catch (error) {
handleToastError(error);
return null;
}
};

const generateAdditionalImages = async (images?: IMedia[]) => {
if (!images) return [];
try {
const uploadImages = await Promise.all(
images?.map((image) => uploadImage(image.file!))
);
return uploadImages;
} catch (error) {
throw error;
}
};

const onSubmit = async (data: CreateProductFormData) => {
if (isPending) return;

    const { imageUrl, images, ...rest } = data;

    try {
      const uploadMainImage = await uploadImage(imageUrl[0].file!);
      if (!uploadMainImage) return;
      const uploadImages = await generateAdditionalImages(images);
      const payload = {
        ...rest,
        primaryImageId: uploadMainImage,
        imageIds: uploadImages,
        type: memorizedCategories.groupCategoryById[rest.categoryId],
      } as CreateProductRequest;
      await addProductMutation.mutateAsync(payload);
      queryClient.invalidateQueries({
        queryKey: [KEYS.PRODUCTS_LIST],
        exact: false,
      });
      toast.success(
        "Product created successfully, redirecting to product list"
      );
      setTimeout(() => {
        router.push(ROUTES.PRODUCT_LIST);
      }, 200);
    } catch (error) {
      handleToastError(error);
    }

};

return {
formMethods,
categoryOptions,
isPending,
onSubmit,
};
};

- form.tsx

import {
SelectField,
TextAreaField,
TextField
} from "@/components/form-field";
import { SwitchFieldV2 } from "@/components/form-field/switch-fieldV2";
import { IOption } from "@/types";
import { DEFAULT_STATUS_OPTIONS } from "@/utils/const";
import { useFormContext } from "react-hook-form";
import { CreateProductFormData } from "../../hooks";

type Props = {
isPending: boolean;
parentCategoryOptions: IOption<string>[];
};

const CreateProductFormBasicUI = ({
isPending,
parentCategoryOptions,
}: Props) => {
const { control } = useFormContext<CreateProductFormData>();
return (

<div className="space-y-6">
<h3 className="text-lg font-semibold">Basic Information</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<TextField
          control={control}
          name="name"
          label="Product Name"
          placeholder="Enter a product name"
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="sku"
          label="SKU"
          placeholder="Enter a SKU"
          required
          disabled={isPending}
        />
      </div>
      <div>
        <TextAreaField
          control={control}
          name="description"
          label="Description"
          placeholder="Enter a description"
          required
          config={{
            maxLength: 1000,
            showCharCount: true,
            rows: 4,
          }}
          disabled={isPending}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 -mt-2">
        <div>
          <SelectField
            control={control}
            name="categoryId"
            label="Category"
            placeholder="Select a category"
            required
            disabled={isPending}
            options={parentCategoryOptions}
            fullWidth
          />
        </div>
        <div>
          <SelectField
            control={control}
            name="status"
            label="Status"
            placeholder="Select a status"
            required
            disabled={isPending}
            options={DEFAULT_STATUS_OPTIONS}
            fullWidth
          />
        </div>
      </div>
      <div>
        <SwitchFieldV2
          control={control}
          name="isFeatured"
          label="Featured Product"
          required
          description="Mark this product as featured to highlight it on your store."
        />
      </div>
    </div>

);
};

export default CreateProductFormBasicUI;

import { TextField } from "@/components/form-field";
import { useFormContext } from "react-hook-form";
import { CreateProductFormData } from "../../hooks";

type Props = {
isPending: boolean;
};

const CreateProductFormPricingUI = ({ isPending }: Props) => {
const { control } = useFormContext<CreateProductFormData>();
return (

<div className="space-y-6">
<h3 className="text-lg font-semibold">Pricing & Inventory</h3>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<TextField
          control={control}
          name="price"
          type="number"
          label="Price"
          min={0}
          step={0.01}
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="salePrice"
          type="number"
          label="Sale Price"
          min={0}
          step={0.01}
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="stockQuantity"
          type="number"
          label="Stock Quantity"
          min={0}
          step={1}
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="unit"
          type="text"
          label="Unit"
          required
          disabled={isPending}
          step={1}
          placeholder="e.g., pcs, kg, m"
        />
      </div>
    </div>

);
};

export default CreateProductFormPricingUI;

import { TextField } from "@/components/form-field";
import { useFormContext } from "react-hook-form";
import { CreateProductFormData } from "../../hooks";

type Props = {
isPending: boolean;
};

const CreateProductFormPricingUI = ({ isPending }: Props) => {
const { control } = useFormContext<CreateProductFormData>();
return (

<div className="space-y-6">
<h3 className="text-lg font-semibold">Pricing & Inventory</h3>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<TextField
          control={control}
          name="price"
          type="number"
          label="Price"
          min={0}
          step={0.01}
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="salePrice"
          type="number"
          label="Sale Price"
          min={0}
          step={0.01}
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="stockQuantity"
          type="number"
          label="Stock Quantity"
          min={0}
          step={1}
          required
          disabled={isPending}
        />

        <TextField
          control={control}
          name="unit"
          type="text"
          label="Unit"
          required
          disabled={isPending}
          step={1}
          placeholder="e.g., pcs, kg, m"
        />
      </div>
    </div>

);
};

export default CreateProductFormPricingUI;

const CreateProductFormImagesUI = ({ isPending }: Props) => {
const { control } = useFormContext<CreateProductFormData>();
return (

<div className="space-y-6">
<h3 className="text-lg font-semibold">Product Images</h3>
<InputFileDropzoneUploadField
control={control}
name="imageUrl"
label="Upload the primary image for your product"
config={{
          maxSize: 5 * 1024 * 1024,
          maxFiles: 1,
        }}
disabled={isPending}
required
/>
<InputFileDropzoneUploadField
control={control}
name="images"
label="Upload Additional Product Images"
config={{
          maxSize: 5 * 1024 * 1024,
          maxFiles: 4,
        }}
disabled={isPending}
/>
</div>
);
};

# D. Refactor lại các chỗ chứa description:

- Sử dụng form-minimal-tiptap thay cho form-textarea cho những form cần SEO, ví dụ product, blog, ...

# E. Lưu ý những example code ở trên là tôi copy ở bên source dùng react vite, mình sẽ reuse lại toàn bộ nhưng phần nào của react library thì mình sẽ move sang nextjs, ví dụ tanstack-router thì dùng router của nextjs. còn lại cách render, call api như nào thì làm giống nhau.
