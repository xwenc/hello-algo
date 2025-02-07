class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * 链表类，支持泛型 T
 */
class LinkedList<T> {
  head: ListNode<T> | null = null;

  /**
   * 向链表末尾添加一个节点
   * @param value 要添加的节点的值
   * 实现：创建一个新节点，如果链表为空，则将新节点设为头节点；
   * 否则遍历链表直到末尾，将新节点添加到末尾
   */
  append(value: T): void {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  /**
   * 向链表开头添加一个节点
   * @param value 要添加的节点的值
   * 实现：创建一个新节点，将新节点的 next 指向当前头节点，
   * 然后将头节点更新为新节点
   */
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  /**
   * 删除链表中值为 value 的节点
   * @param value 要删除的节点的值
   * 实现：如果头节点为空，直接返回；
   * 如果头节点的值为要删除的值，则将头节点更新为下一个节点；
   * 否则遍历链表，找到值为要删除的值的节点，将其从链表中移除
   */
  delete(value: T): void {
    if(this.head === null) {
      return;
    }
    if(this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while(current.next !== null) {
      if(current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  /**
   * 查找链表中值为 value 的节点
   * @param value 要查找的节点的值
   * @returns 找到的节点，如果未找到则返回 null
   * 实现：遍历链表，找到值为要查找的值的节点并返回
   */
  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * 打印链表
   * 实现：遍历链表，将每个节点的值存入数组中，
   * 然后将数组中的值用 ' -> ' 连接并打印
   */
  print(): void {
    const nodes = [];
    let current = this.head;
    while (current !== null) {
      nodes.push(current.value);
      current = current.next;
    }
    console.log(nodes.join(' -> '));
  }

  /**
   * 删除链表中的倒数第 n 个节点
   * @param n 要删除的节点的位置（从链表末尾开始计数）
   * 实现：使用虚拟表头和双指针技巧。首先创建一个虚拟表头节点并将其 next 指向头节点，
   * 然后将两个指针 first 和 second 都指向虚拟表头。将 first 指针向前移动 n+1 步，
   * 接着同时移动 first 和 second 指针，直到 first 指针到达链表末尾。
   * 此时，second 指针指向的节点即为要删除节点的前一个节点。将 second 指针的 next 指向要删除节点的下一个节点。
   * 最后更新头节点为虚拟表头的 next。
   */
  removeNthFromEnd(n: number): void {
    const dummy = new ListNode<T>(null);
    dummy.next = this.head;
    let first: ListNode<T> | null = dummy;
    let second: ListNode<T> | null = dummy;
    for (let i = 1; i <= n + 1; i++) {
      first = first!.next;
    }
    while (first !== null) {
      first = first.next;
      second = second!.next;
    }
    second!.next = second!.next!.next;
    this.head = dummy.next;
  }
}