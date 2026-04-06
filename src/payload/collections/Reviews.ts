import type { CollectionConfig } from 'payload'

import { revalidateAfterChange } from '../hooks/revalidateContent.ts'
import { syncBooksyReviews } from '../endpoints/syncBooksyReviews.ts'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewerName',
    defaultColumns: ['reviewerName', 'rating', 'source', 'reviewDate'],
    group: 'Content',
    components: {
      beforeListTable: ['./components/SyncBooksyButton#SyncBooksyButton'],
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  endpoints: [
    {
      path: '/sync-booksy',
      method: 'post',
      handler: syncBooksyReviews,
    },
  ],
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
      label: 'Reviewer Name',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          required: true,
          label: 'Rating (1-5)',
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: { width: '50%' },
        },
        {
          name: 'reviewDate',
          type: 'date',
          required: true,
          label: 'Review Date',
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
          },
        },
      ],
    },
    {
      name: 'reviewContent',
      type: 'textarea',
      required: true,
      label: 'Review Text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'service',
          type: 'text',
          label: 'Service',
          admin: { width: '50%' },
        },
        {
          name: 'source',
          type: 'select',
          label: 'Source',
          defaultValue: 'booksy',
          options: [
            { label: 'Booksy', value: 'booksy' },
            { label: 'Google', value: 'google' },
            { label: 'Manual', value: 'manual' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      label: 'Verified Customer',
      defaultValue: true,
    },
    {
      name: 'booksyId',
      type: 'number',
      label: 'Booksy ID',
      unique: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
