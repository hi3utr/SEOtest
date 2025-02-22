<script setup lang="ts">
import { DatePicker, useDatePicker } from '@ark-ui/vue/date-picker';

const datePicker = useDatePicker();
</script>

<template>
  <DatePicker.RootProvider :value="datePicker" class="w-fit">
    <DatePicker.Control>
      <DatePicker.Trigger
        class="flex justify-between border-solid border-[1px] border-[#85AEC6] bg-white w-[160px] px-[10px] py-2"
      >
        <DatePicker.Input
          class="focus:outline-none text-16-400 w-full"
          placeholder=""
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10L12.0008 14.58L17 10"
            stroke="#666666"
            stroke-linecap="square"
          />
        </svg>
      </DatePicker.Trigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content class="bg-white py-5 px-6 shadow w-[362px] ml-3">
        <DatePicker.View view="day">
          <DatePicker.Context v-slot="api">
            <DatePicker.ViewControl
              class="w-full flex content-between justify-between mb-3"
            >
              <DatePicker.PrevTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11 13.5L6 8.5L11 3.5"
                    stroke="#808080"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </DatePicker.PrevTrigger>
              <DatePicker.ViewTrigger>
                <DatePicker.RangeText />
              </DatePicker.ViewTrigger>
              <DatePicker.NextTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M6 3.5L11 8.5L6 13.5"
                    stroke="#808080"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </DatePicker.NextTrigger>
            </DatePicker.ViewControl>
            <DatePicker.Table class="w-full">
              <DatePicker.TableHead class="">
                <DatePicker.TableRow class="text-14-600">
                  <DatePicker.TableHeader
                    v-for="(weekDay, id) in api.weekDays"
                    :key="id"
                  >
                    {{ weekDay.short }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                <DatePicker.TableRow
                  v-for="(week, id) in api.weeks"
                  :key="id"
                  class="text-center mb-1"
                >
                  <DatePicker.TableCell
                    v-for="(day, id) in week"
                    :key="id"
                    :value="day"
                  >
                    <DatePicker.TableCellTrigger
                      class="py-[9px] px-[6px] data-[selected]:bg-blue data-[selected]:text-white data-[selected]:rounded-full data-[selected]:relative data-[disabled]:text-c1 data-[disabled]:cursor-not-allowed"
                      >{{ day.day }}</DatePicker.TableCellTrigger
                    >
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.RootProvider>
</template>
