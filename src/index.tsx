import { ActionPanel, Action, List, showToast, Toast, Icon } from '@raycast/api';
import { useState } from 'react';
import { convert, ConvertResultItem } from './convert';

export default function Command() {
  const { state, convertIntoState } = useConvert();

  return (
    <List
      onSearchTextChange={convertIntoState}
      searchBarPlaceholder='Epoch or human-readable date'
      throttle
    >
      <List.Section title='Results' subtitle={state.results.length.toString()}>
        {state.results.map((convertResult) => (
          <ConvertListItem key={convertResult.name} convertResult={convertResult} />
        ))}
      </List.Section>
    </List>
  );
}

function ConvertListItem({ convertResult }: { convertResult: ConvertResultItem }) {
  return (
    <List.Item
      title={convertResult.content}
      accessories={[{ icon: Icon.Text, text: convertResult.name }]}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              title="Copy To ClipBoard"
              content={convertResult.content}
              shortcut={{ modifiers: ["cmd"], key: "." }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

function useConvert() {
  const [state, setState] = useState<ConvertState>({ results: initialResults() });

    function convertIntoState(searchText: string) {
      const results: ConvertResultItem[] = [];

      convert(results, searchText)

      setState((oldState) => ({
        ...oldState,
        results: results,
      }));
    }

  return {
    state,
    convertIntoState,
  };
}

function initialResults(): ConvertResultItem[] {
  return [{ name: 'Current timestamp', content: (Date.now() / 1000).toString() }];
}

interface ConvertState {
  results: ConvertResultItem[];
}
