import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from "@angular/cdk/tree";

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
  selector: 'tree-demo',
  templateUrl: 'tree-demo.component.html',
  styleUrls: ['tree-demo.component.scss']
})

export class TreeDemoComponent implements OnInit {

  nestedDataSource: MatTreeNestedDataSource<CourseNode>;

  nestedTreeControl: NestedTreeControl<CourseNode>;

  constructor() {
    this.nestedDataSource = new MatTreeNestedDataSource<CourseNode>();

    this.nestedTreeControl =
      new NestedTreeControl<CourseNode>(node => node.children);
  };

  ngOnInit() {
    this.nestedDataSource.data = TREE_DATA;
  }

  hasNestedChild(index: number, node: CourseNode) {
    return node?.children.length > 0;
  }
}


